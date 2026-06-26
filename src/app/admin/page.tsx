"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export default function AdminPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [newCategoryName, setNewCategoryName] = useState('');
  const [menuItems, setMenuItems] = useState<any[]>([]);

  // Promotions State
  const [promotions, setPromotions] = useState<any[]>([]);
  const [promoTitle, setPromoTitle] = useState('');
  const [promoDesc, setPromoDesc] = useState('');
  const [promoImage, setPromoImage] = useState<File | null>(null);

  // Events State
  const [events, setEvents] = useState<any[]>([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventImage, setEventImage] = useState<File | null>(null);

  useEffect(() => {
    loadCategories();
    loadItems();
    loadPromotions();
    loadEvents();
  }, []);

  async function loadEvents() {
    const { data } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    if (data) setEvents(data);
  }

  async function loadPromotions() {
    const { data } = await supabase.from('promotions').select('*').order('created_at', { ascending: false });
    if (data) setPromotions(data);
  }

  async function loadItems() {
    const { data } = await supabase
      .from('menu_items')
      .select('*, category:menu_categories(name)')
      .order('created_at', { ascending: false });
    if (data) setMenuItems(data);
  }

  async function loadCategories() {
    const { data } = await supabase.from('menu_categories').select('*').order('sort_order', { ascending: true });
    if (data) {
      setCategories(data);
      if (data.length > 0 && !categoryId) setCategoryId(data[0].id);
    }
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCategoryName) return;
    setLoading(true);
    const { error } = await supabase.from('menu_categories').insert([{ name: newCategoryName }]);
    if (error) {
      setMessage('Ошибка: ' + error.message);
    } else {
      setMessage('Категория добавлена!');
      setNewCategoryName('');
      loadCategories();
    }
    setLoading(false);
  }

  async function handleAddPromotion(e: React.FormEvent) {
    e.preventDefault();
    if (!promoTitle || !promoImage) {
      setMessage('Укажите заголовок и выберите фото для акции');
      return;
    }
    setLoading(true);
    const fileExt = promoImage.name.split('.').pop();
    const fileName = `promo_${uuidv4()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage.from('menu_images').upload(fileName, promoImage);
    
    if (uploadError) {
      setMessage('Ошибка загрузки баннера: ' + uploadError.message);
      setLoading(false);
      return;
    }
    
    const { data: urlData } = supabase.storage.from('menu_images').getPublicUrl(fileName);
    
    const { error } = await supabase.from('promotions').insert([{
      title: promoTitle,
      description: promoDesc,
      image_url: urlData.publicUrl
    }]);

    if (error) {
      setMessage('Ошибка: ' + error.message);
    } else {
      setMessage('Акция добавлена!');
      setPromoTitle('');
      setPromoDesc('');
      setPromoImage(null);
      loadPromotions();
    }
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  }

  async function handleDeletePromotion(id: string) {
    if (!confirm('Удалить эту акцию?')) return;
    setLoading(true);
    const { error } = await supabase.from('promotions').delete().eq('id', id);
    if (!error) {
      setMessage('Акция удалена!');
      loadPromotions();
    }
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  }

  async function handleAddEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!eventTitle || !eventDate) {
      setMessage('Укажите название и дату мероприятия');
      return;
    }
    setLoading(true);
    let imageUrl = '';

    if (eventImage) {
      const fileExt = eventImage.name.split('.').pop();
      const fileName = `event_${uuidv4()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('menu_images').upload(fileName, eventImage);
      if (uploadError) {
        setMessage('Ошибка фото афиши: ' + uploadError.message);
        setLoading(false);
        return;
      }
      const { data: urlData } = supabase.storage.from('menu_images').getPublicUrl(fileName);
      imageUrl = urlData.publicUrl;
    }

    const { error } = await supabase.from('events').insert([{
      title: eventTitle,
      event_date: eventDate,
      description: eventDesc,
      image_url: imageUrl
    }]);

    if (error) {
      setMessage('Ошибка: ' + error.message);
    } else {
      setMessage('Событие добавлено в афишу!');
      setEventTitle('');
      setEventDate('');
      setEventDesc('');
      setEventImage(null);
      loadEvents();
    }
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  }

  async function handleDeleteEvent(id: string) {
    if (!confirm('Удалить это событие из афиши?')) return;
    setLoading(true);
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (!error) {
      setMessage('Событие удалено!');
      loadEvents();
    }
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  }

  async function handleDeleteItem(id: string) {
    if (!confirm('Точно удалить это блюдо?')) return;
    setLoading(true);
    const { error } = await supabase.from('menu_items').delete().eq('id', id);
    if (error) {
      setMessage('Ошибка удаления: ' + error.message);
    } else {
      setMessage('Блюдо успешно удалено!');
      loadItems();
    }
    setLoading(false);
    setTimeout(() => setMessage(''), 3000);
  }

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !price || !categoryId) {
      setMessage('Заполните обязательные поля (Категория, Название, Цена)');
      return;
    }

    setLoading(true);
    let imageUrl = '';

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from('menu_images')
        .upload(fileName, imageFile);

      if (uploadError) {
        setMessage('Ошибка загрузки фото: ' + uploadError.message);
        setLoading(false);
        return;
      }
      
      const { data: publicUrlData } = supabase.storage.from('menu_images').getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from('menu_items').insert([
      {
        title,
        price,
        description,
        category_id: categoryId,
        image_url: imageUrl
      }
    ]);

    if (error) {
      setMessage('Ошибка: ' + error.message);
    } else {
      setMessage('Блюдо успешно добавлено в меню!');
      setTitle('');
      setPrice('');
      setDescription('');
      setImageFile(null);
      loadItems();
    }
    setLoading(false);
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  }

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8 bg-background min-h-screen text-foreground pt-32">
      <h1 className="text-3xl font-bold mb-2">Панель управления</h1>
      <p className="text-foreground/60 mb-8">Добавляйте новые категории и блюда в меню. Изменения сразу появятся на сайте.</p>
      
      {message && (
        <div className="p-4 mb-6 bg-gold/20 text-gold rounded-md border border-gold">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Category Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-black/5 h-fit">
          <h2 className="text-xl font-bold mb-4">1. Добавить категорию</h2>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Название категории</label>
              <input 
                type="text" 
                value={newCategoryName}
                onChange={e => setNewCategoryName(e.target.value)}
                className="w-full border border-black/10 rounded-md px-4 py-2 bg-black/5 focus:outline-none focus:border-gold transition-colors"
                placeholder="Например: Салаты"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-burgundy text-white px-6 py-2 rounded-md hover:bg-burgundy-hover transition-colors w-full sm:w-auto"
            >
              Создать категорию
            </button>
          </form>
        </div>

        {/* Item Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-black/5">
          <h2 className="text-xl font-bold mb-4">2. Добавить блюдо</h2>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Выберите категорию</label>
              <select 
                value={categoryId} 
                onChange={e => setCategoryId(e.target.value)}
                className="w-full border border-black/10 rounded-md px-4 py-2 bg-black/5 focus:outline-none focus:border-gold transition-colors"
              >
                <option value="" disabled>-- Выберите --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Название блюда</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full border border-black/10 rounded-md px-4 py-2 bg-black/5 focus:outline-none focus:border-gold transition-colors"
                placeholder="Например: Цезарь с курицей"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Цена</label>
              <input 
                type="text" 
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full border border-black/10 rounded-md px-4 py-2 bg-black/5 focus:outline-none focus:border-gold transition-colors"
                placeholder="450 ₽"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Описание (состав)</label>
              <textarea 
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full border border-black/10 rounded-md px-4 py-2 bg-black/5 focus:outline-none focus:border-gold transition-colors min-h-[100px]"
                placeholder="(Салатные листья, черри, сыр...)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Фотография (необязательно)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)}
                className="w-full border border-black/10 rounded-md px-4 py-2 bg-black/5 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-gold text-white px-6 py-3 rounded-md hover:bg-gold-hover transition-colors w-full font-bold text-lg mt-4"
            >
              {loading ? 'Загрузка в базу...' : 'Добавить блюдо в меню'}
            </button>
          </form>
        </div>
      </div>

      {/* Items List */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-black/5">
        <h2 className="text-xl font-bold mb-6">Управление текущим меню</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/10">
                <th className="py-3 px-4 font-semibold text-foreground/80">Фото</th>
                <th className="py-3 px-4 font-semibold text-foreground/80">Категория</th>
                <th className="py-3 px-4 font-semibold text-foreground/80">Название</th>
                <th className="py-3 px-4 font-semibold text-foreground/80">Цена</th>
                <th className="py-3 px-4 font-semibold text-foreground/80 text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => (
                <tr key={item.id} className="border-b border-black/5 hover:bg-black/5 transition-colors">
                  <td className="py-3 px-4">
                    {item.image_url ? (
                      <img src={item.image_url} alt="" className="w-12 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-12 h-12 bg-black/10 rounded"></div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-foreground/80">{item.category?.name}</td>
                  <td className="py-3 px-4 font-medium">{item.title}</td>
                  <td className="py-3 px-4 font-bold text-gold">{item.price}</td>
                  <td className="py-3 px-4 text-right">
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      disabled={loading}
                      className="text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
              {menuItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-foreground/50">
                    Меню пока пустое
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Promotions Section */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-black/5">
        <h2 className="text-xl font-bold mb-6 text-burgundy">3. Добавить Акцию / Спецпредложение</h2>
        <form onSubmit={handleAddPromotion} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground/80">Заголовок акции</label>
            <input 
              type="text" 
              value={promoTitle}
              onChange={e => setPromoTitle(e.target.value)}
              className="w-full border border-black/10 rounded-md px-4 py-2 bg-black/5 focus:outline-none focus:border-gold transition-colors"
              placeholder="Например: Скидка 20% в День Рождения"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground/80">Описание акции (необязательно)</label>
            <textarea 
              value={promoDesc}
              onChange={e => setPromoDesc(e.target.value)}
              className="w-full border border-black/10 rounded-md px-4 py-2 bg-black/5 focus:outline-none focus:border-gold transition-colors min-h-[80px]"
              placeholder="Подробные условия акции..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground/80">Баннер акции (обязательно)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={e => setPromoImage(e.target.files ? e.target.files[0] : null)}
              className="w-full border border-black/10 rounded-md px-4 py-2 bg-black/5 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-burgundy/10 file:text-burgundy hover:file:bg-burgundy/20"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-burgundy text-white px-6 py-3 rounded-md hover:bg-burgundy-hover transition-colors font-bold text-lg"
          >
            Добавить акцию
          </button>
        </form>

        {promotions.length > 0 && (
          <div className="mt-8 border-t border-black/5 pt-6">
            <h3 className="text-lg font-bold mb-4">Активные акции</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {promotions.map(promo => (
                <div key={promo.id} className="border border-black/10 rounded-lg overflow-hidden relative group">
                  <img src={promo.image_url} className="w-full h-32 object-cover" alt="" />
                  <div className="p-4">
                    <h4 className="font-bold mb-1">{promo.title}</h4>
                    <button 
                      onClick={() => handleDeletePromotion(promo.id)}
                      disabled={loading}
                      className="text-red-500 text-sm font-medium hover:underline mt-2"
                    >
                      Удалить акцию
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Events Section */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow-sm border border-black/5">
        <h2 className="text-xl font-bold mb-6 text-emerald-800">4. Добавить Событие в Афишу</h2>
        <form onSubmit={handleAddEvent} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Дата и Время</label>
              <input 
                type="text" 
                value={eventDate}
                onChange={e => setEventDate(e.target.value)}
                className="w-full border border-black/10 rounded-md px-4 py-2 bg-black/5 focus:outline-none focus:border-gold transition-colors"
                placeholder="Например: 28 Октября, 20:00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground/80">Название концерта/события</label>
              <input 
                type="text" 
                value={eventTitle}
                onChange={e => setEventTitle(e.target.value)}
                className="w-full border border-black/10 rounded-md px-4 py-2 bg-black/5 focus:outline-none focus:border-gold transition-colors"
                placeholder="Выступление гр. Краски"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground/80">Описание (необязательно)</label>
            <textarea 
              value={eventDesc}
              onChange={e => setEventDesc(e.target.value)}
              className="w-full border border-black/10 rounded-md px-4 py-2 bg-black/5 focus:outline-none focus:border-gold transition-colors min-h-[80px]"
              placeholder="Живой звук, билеты от 1000 руб..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground/80">Постер / Фото (необязательно)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={e => setEventImage(e.target.files ? e.target.files[0] : null)}
              className="w-full border border-black/10 rounded-md px-4 py-2 bg-black/5 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-800/10 file:text-emerald-800 hover:file:bg-emerald-800/20"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-emerald-800 text-white px-6 py-3 rounded-md hover:bg-emerald-900 transition-colors font-bold text-lg"
          >
            Добавить в Афишу
          </button>
        </form>

        {events.length > 0 && (
          <div className="mt-8 border-t border-black/5 pt-6">
            <h3 className="text-lg font-bold mb-4">Ближайшие события</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(evt => (
                <div key={evt.id} className="border border-black/10 rounded-lg overflow-hidden flex bg-black/5">
                  {evt.image_url && (
                    <img src={evt.image_url} className="w-24 h-24 object-cover" alt="" />
                  )}
                  <div className="p-4 flex flex-col justify-center">
                    <p className="text-xs text-gold font-bold mb-1">{evt.event_date}</p>
                    <h4 className="font-bold text-sm mb-1">{evt.title}</h4>
                    <button 
                      onClick={() => handleDeleteEvent(evt.id)}
                      disabled={loading}
                      className="text-red-500 text-xs font-medium hover:underline mt-1 self-start"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
