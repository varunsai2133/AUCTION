import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AuctionCard from "@/components/auction-card"

export default function DashboardPage() {
  // This would typically fetch from a database
  const myAuctions = [
    {
      id: 1,
      title: "Vintage Camera",
      description: "Professional film camera from the 1960s",
      currentBid: 200,
      endTime: "2024-03-05T00:00:00Z",
      imageUrl: "/placeholder.svg?height=200&width=300",
      seller: "Current User",
    },
  ]

  const myBids = [
    {
      id: 2,
      title: "Antique Clock",
      description: "Beautiful wall clock from the Victorian era",
      currentBid: 150,
      endTime: "2024-03-03T00:00:00Z",
      imageUrl: "/placeholder.svg?height=200&width=300",
      seller: "Jane Smith",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>

      <Tabs defaultValue="my-auctions">
        <TabsList className="mb-4">
          <TabsTrigger value="my-auctions">My Auctions</TabsTrigger>
          <TabsTrigger value="my-bids">My Bids</TabsTrigger>
        </TabsList>

        <TabsContent value="my-auctions">
          <Card>
            <CardHeader>
              <CardTitle>My Listed Auctions</CardTitle>
              <CardDescription>Manage your active auction listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-bids">
          <Card>
            <CardHeader>
              <CardTitle>My Active Bids</CardTitle>
              <CardDescription>Track the auctions you're participating in</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myBids.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

