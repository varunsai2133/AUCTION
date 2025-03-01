"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Plus } from "lucide-react"

interface CreateAuctionDialogProps {
  onAuctionCreated: (auction: any) => void
}

export default function CreateAuctionDialog({ onAuctionCreated }: CreateAuctionDialogProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingBid: "",
    endDate: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      startingBid: "",
      endDate: "",
    })
    setImagePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would typically send the data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulated API call

      const newAuction = {
        id: Math.random(), // This should come from your backend
        title: formData.title,
        description: formData.description,
        currentBid: Number(formData.startingBid),
        endTime: formData.endDate,
        imageUrl: imagePreview || "/placeholder.svg?height=200&width=300",
        seller: "Current User", // This should come from your auth system
      }

      onAuctionCreated(newAuction)

      toast({
        title: "Auction Created!",
        description: "Your item has been listed for auction.",
        duration: 5000,
      })

      setOpen(false)
      resetForm()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create auction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" /> Create New Auction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Create New Auction
          </DialogTitle>
          <DialogDescription>Fill in the details to list your item for auction</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Item Title</Label>
            <Input
              id="title"
              placeholder="Enter item title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your item"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="min-h-[100px] transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Item Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
            {imagePreview && (
              <div className="relative aspect-video mt-2 rounded-lg overflow-hidden">
                <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startingBid">Starting Bid ($)</Label>
              <Input
                id="startingBid"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.startingBid}
                onChange={(e) => setFormData({ ...formData, startingBid: e.target.value })}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Auction"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

