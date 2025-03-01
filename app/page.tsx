"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AuctionCard from "@/components/auction-card"
import CreateAuctionDialog from "@/components/create-auction-dialog"
import { Gavel } from "lucide-react"

export default function Home() {
  const [auctions, setAuctions] = useState([
    {
      id: 1,
      title: "Vintage Watch",
      description: "A beautiful vintage timepiece in excellent condition",
      currentBid: 150,
      endTime: "2024-03-01T00:00:00Z",
      imageUrl: "/placeholder.svg?height=200&width=300",
      seller: "John Doe",
    },
    {
      id: 2,
      title: "Gaming Console",
      description: "Latest generation gaming console with controllers",
      currentBid: 350,
      endTime: "2024-03-02T00:00:00Z",
      imageUrl: "/placeholder.svg?height=200&width=300",
      seller: "Jane Smith",
    },
  ])

  const handleAuctionCreated = (newAuction: any) => {
    setAuctions([newAuction, ...auctions])
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
          Welcome to AuctionHub
        </h1>
        <p className="text-xl text-muted-foreground mb-8">Discover unique items and place your bids!</p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" asChild size="lg" className="shadow-sm">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Gavel className="w-6 h-6" />
          Active Auctions
        </h2>
        <CreateAuctionDialog onAuctionCreated={handleAuctionCreated} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
    </main>
  )
}

