import './App.css'
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs'

function App() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className="text-3xl font-bold mb-4">Product Hunt</h1>
      <Tabs defaultValue="popular">
        <TabsList>
          <TabsTrigger value="popular">Most Popular</TabsTrigger>
          <TabsTrigger value="recent">Most Recent</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default App
