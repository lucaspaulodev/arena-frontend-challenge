import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import PostList from './components/PostList'

import './App.css'

function App() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className="text-3xl font-bold mb-4">Product Hunt</h1>
      <Tabs defaultValue="popular">
        <TabsList>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="recent">Most Recent</TabsTrigger>
        </TabsList>
        <TabsContent value="popular">
          <PostList orderBy='VOTES'/>
        </TabsContent>
        <TabsContent value="recent">
          <PostList orderBy='NEWEST'/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default App
