import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs'
import PostList from './components/PostList'
import { DatePicker } from './components/DatePicker'

import './App.css'
import './index.css'
import ProductDetail from './components/ProductDetail';
import type { Post } from './types';

function App() {
  const [tab, setTab] = useState('popular');
  const [selectedProduct, setSelectedProduct] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleProductClick = (product: Post) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
    if (newTab === 'recent') {
      setSelectedDate(new Date());
    } else {
      setSelectedDate(undefined);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  return (
    <div className="app-bg min-h-screen flex flex-col">
      <header className="top-0 z-10 w-full backdrop-blur py-4 mb-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--ph-orange)]">Product Hunt</h1>
          <div className="flex items-center gap-4">
            <Tabs defaultValue={tab} onValueChange={handleTabChange}>
              <TabsList className="ph-tabs-list">
                <TabsTrigger value="popular">Most Popular</TabsTrigger>
                <TabsTrigger value="recent">Most Recent</TabsTrigger>
              </TabsList>
            </Tabs>
            {tab === 'recent' && (
              <DatePicker 
                date={selectedDate} 
                onDateChange={handleDateChange}
              />
            )}
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 max-w-2xl w-full">
        {tab === 'popular' && <PostList orderBy='VOTES' onItemClick={handleProductClick}/>}
        {tab === 'recent' && <PostList orderBy='NEWEST' onItemClick={handleProductClick} date={selectedDate}/>}
      </div>
      <footer className="ph-footer text-center py-4 text-sm text-[var(--ph-gray)] bg-transparent mt-8">
        <span>Inspired by Product Hunt &middot; Arena Challenge</span>
      </footer>
      <ProductDetail post={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default App
