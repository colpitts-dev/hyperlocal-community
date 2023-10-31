export interface Auction {
  id: string
  title: string
  seller: string,
  status: 'OPEN' | 'CLOSED'
  highestBid: {
    amount: number
    bidder: string
  }
  image: string
}