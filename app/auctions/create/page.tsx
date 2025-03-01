"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function CreateAuctionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would typically send the data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulated API call

      toast({
        title: "Auction Created!",
        description: "Your item has been listed for auction.",
        duration: 5000,
      })

      router.push("/dashboard")
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
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Create New Auction
          </CardTitle>
          <CardDescription>Fill in the details to list your item for auction</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Auction"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

