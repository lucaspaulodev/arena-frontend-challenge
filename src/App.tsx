import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs'
import PostList from './components/PostList'

import './App.css'
import './index.css'

function App() {
  const [tab, setTab] = useState('popular');
  return (
    <div className="app-bg min-h-screen flex flex-col">
      <header className="top-0 z-10 w-full backdrop-blur py-4 mb-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold tracking-tight text-[var(--ph-orange)]">Product Hunt</h1>
          <div>
            <Tabs defaultValue={tab} onValueChange={setTab}>
              <TabsList className="ph-tabs-list">
                <TabsTrigger value="popular">Most Popular</TabsTrigger>
                <TabsTrigger value="recent">Most Recent</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 max-w-2xl w-full">
        {tab === 'popular' && <PostList orderBy='VOTES' />}
        {tab === 'recent' && <PostList orderBy='NEWEST' />}
      </div>
      <footer className="ph-footer text-center py-4 text-sm text-[var(--ph-gray)] bg-transparent mt-8">
        <span>Inspired by Product Hunt &middot; Arena Challenge</span>
      </footer>
    </div>
  )
}

export default App
