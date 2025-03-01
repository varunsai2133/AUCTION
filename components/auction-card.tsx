import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AuctionCardProps {
  auction: {
    id: number
    title: string
    description: string
    currentBid: number
    endTime: string
    imageUrl: string
    seller: string
  }
}

export default function AuctionCard({ auction }: AuctionCardProps) {
  const timeRemaining = new Date(auction.endTime).getTime() - new Date().getTime()
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24))

  return (
    <div className="gradient-border auction-card">
      <Card className="border-0">
        <div className="relative aspect-video">
          <Image
            src={auction.imageUrl || "/placeholder.svg"}
            alt={auction.title}
            fill
            className="object-cover rounded-t-lg"
          />
          <Badge className="absolute top-2 right-2 bg-secondary hover:bg-secondary">${auction.currentBid}</Badge>
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-1">{auction.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{auction.description}</p>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Seller: {auction.seller}</p>
            <Badge variant="outline" className="bg-muted">
              {daysRemaining} days left
            </Badge>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full bg-primary hover:bg-primary/90">
            <Link href={`/auctions/${auction.id}`}>View Auction</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

