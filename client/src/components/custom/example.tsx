'use client'

import { useState } from 'react'
import { Plus, Youtube, FileText, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResourceLoader } from '../data-loaders/resource-loader'

type Resource = {
  id: number;
  documentId: string;
  type: 'youtube' | 'text';
  content: string;
  isSelected: boolean;
}

export default function ResourceChatApp() {
  const [resources, setResources] = useState<Resource[]>([])
  const [chatHistory, setChatHistory] = useState('')
  const [notes, setNotes] = useState('')
  const [currentMessage, setCurrentMessage] = useState('')
  const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false)
  const [isTextModalOpen, setIsTextModalOpen] = useState(false)
  const [newYoutubeUrl, setNewYoutubeUrl] = useState('')
  const [newTextContent, setNewTextContent] = useState('')

  const addResource = (type: 'youtube' | 'text', content: string) => {
    const newResource: Resource = {
      id: Date.now(),
      type,
      content,
      isSelected: false
    }
    setResources(prev => [...prev, newResource])
  }

  const toggleResourceSelection = (documentId: string) => {
    setResources(prev => prev.map(resource => 
      resource.documentId === documentId ? { ...resource, isSelected: !resource.isSelected } : resource
    ))
  }

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      setChatHistory(prev => prev + '\n\nUser: ' + currentMessage)
      setCurrentMessage('')
      // Here you would typically send the message to an AI service and get a response
      // For now, we'll just simulate a response
      setTimeout(() => {
        setChatHistory(prev => prev + '\n\nAI: This is a simulated response.')
      }, 1000)
    }
  }

  const handleUpdateNotes = () => {
    // Here you would typically send the updated notes to a server
    console.log('Notes updated:', notes)
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0 p-6">
        <Tabs defaultValue="chat" className="h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="p-4">
            <div className="flex-1 flex flex-col border rounded-md  h-[calc(100vh-100px)] overflow-hidden">
              <ScrollArea className="flex-1 p-4">
                {chatHistory.split('\n\n').map((message, index) => (
                  <p key={index} className="mb-2">{message}</p>
                ))}
              </ScrollArea>
              <div className="p-4 border-t flex space-x-2">
                <Textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="flex-1 flex flex-col p-4 h-[calc(100vh-100px)] ">
            <div className="flex-1 flex flex-col border rounded-md overflow-hidden">
              <ScrollArea className="flex-1 p-4">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Your notes..."
                  className="min-h-[200px] resize-none border-0"
                />
              </ScrollArea>
              <div className="p-4 border-t">
                <Button onClick={handleUpdateNotes}>Update Notes</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-64 border-l p-4 flex flex-col shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Resources</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add resource</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setIsYoutubeModalOpen(true)}>
                <Youtube className="mr-2 h-4 w-4" />
                <span>YouTube URL</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsTextModalOpen(true)}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Text</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ScrollArea className="flex-1">
          <ResourceLoader component={(resource: Resource) => (
            <div key={resource.documentId} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={`resource-${resource.id}`}
                checked={resource.isSelected}
                onCheckedChange={() => toggleResourceSelection(resource.documentId)}
              />
              <span>{resource.type}</span>
            </div>
          )}/>
        </ScrollArea>
      </div>

      <Dialog open={isYoutubeModalOpen} onOpenChange={setIsYoutubeModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add YouTube URL</DialogTitle>
          </DialogHeader>
          <Input
            value={newYoutubeUrl}
            onChange={(e) => setNewYoutubeUrl(e.target.value)}
            placeholder="Enter YouTube URL"
          />
          <Button onClick={() => {
            addResource('youtube', newYoutubeUrl)
            setNewYoutubeUrl('')
            setIsYoutubeModalOpen(false)
          }}>Add</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={isTextModalOpen} onOpenChange={setIsTextModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Text Resource</DialogTitle>
          </DialogHeader>
          <Textarea
            value={newTextContent}
            onChange={(e) => setNewTextContent(e.target.value)}
            placeholder="Enter text content"
          />
          <Button onClick={() => {
            addResource('text', newTextContent)
            setNewTextContent('')
            setIsTextModalOpen(false)
          }}>Add</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}