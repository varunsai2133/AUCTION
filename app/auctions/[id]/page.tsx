"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Clock, DollarSign, User } from "lucide-react"

export default function AuctionPage({ params }: { params: { id: string } }) {
  const [bidAmount, setBidAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // This would typically fetch from a database
  const auction = {
    id: params.id,
    title: "Vintage Watch",
    description: "A beautiful vintage timepiece in excellent condition",
    currentBid: 150,
    endTime: "2024-03-01T00:00:00Z",
    imageUrl: "/placeholder.svg?height=400&width=600",
    seller: "John Doe",
    bids: [
      { amount: 150, bidder: "Alice", time: "2024-02-20T15:30:00Z" },
      { amount: 145, bidder: "Bob", time: "2024-02-20T15:00:00Z" },
      { amount: 140, bidder: "Charlie", time: "2024-02-20T14:30:00Z" },
    ],
  }

  const handleBid = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Here you would typically send the bid to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulated API call

      toast({
        title: "Bid Placed!",
        description: `You've successfully bid $${bidAmount} on ${auction.title}`,
        duration: 5000,
      })

      setBidAmount("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to place bid. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="gradient-border">
            <div className="relative aspect-4/3 rounded-lg overflow-hidden">
              <Image src={auction.imageUrl || "/placeholder.svg"} alt={auction.title} fill className="object-cover" />
            </div>
          </div>

          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" /> Bid History
              </CardTitle>
              <CardDescription>Previous bids on this item</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auction.bids.map((bid, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="h-8 w-8 rounded-full flex items-center justify-center p-0">
                        <DollarSign className="w-4 h-4" />
                      </Badge>
                      <div>
                        <p className="font-medium">${bid.amount}</p>
                        <p className="text-sm text-muted-foreground">by {bid.bidder}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{new Date(bid.time).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <Badge className="w-fit mb-2 bg-secondary hover:bg-secondary/90">
                Current Bid: ${auction.currentBid}
              </Badge>
              <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {auction.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <User className="w-4 h-4" /> Sold by {auction.seller}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg">{auction.description}</p>

              <div className="p-4 rounded-lg bg-white/50">
                <p className="text-sm text-muted-foreground mb-1">Auction ends:</p>
                <p className="font-semibold">{new Date(auction.endTime).toLocaleString()}</p>
              </div>

              <form onSubmit={handleBid} className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    type="number"
                    min={auction.currentBid + 1}
                    step="0.01"
                    placeholder={`Min bid: $${auction.currentBid + 1}`}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    required
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                  >
                    {isLoading ? "Placing Bid..." : "Place Bid"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Enter an amount greater than ${auction.currentBid}</p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

