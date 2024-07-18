import Container from "../components/Container/Container"

export const metadata = {
    title: 'Maintenance',
    icons: [
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            url: '/favicons/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: '/favicons/favicon-16x16.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            url: '/favicons/apple-touch-icon.png',
        },
    ],
    description: 'CryptoMarketVision (CMV) is a website, that provides details about various crypto-currencies, NFTS, Exchanges & Categories. It also shows Trending Cryptocurrencies, NFTs & Categories. You can also compare crypto-coins, add them to Watch list. You can also get Historical data of crypto coins, OHLC data, Market Chart, Market Chart with specific range etc. You can also get details about NFTs, Exchanges.'
    ,
    content: 'CryptoMarketVision (CMV) is a website, that provides details about Cryptocurrency, Market Cap, Trending Cryptocurrencies, Trending NFTs, Market Dominance, Trading Volume etc.'
    ,
    keywords: ['crypto', 'coin', 'coins', 'crypto coins', 'exchange', 'crypto exchange', 'defi', 'defi crypto', 'cryptocurrency', 'crypto currencies', 'crypto market', 'blockchain', 'nft', 'nfts', 'market cap', 'crypto market cap', 'cryptocurrency price', 'crypto price', 'cryptocurrencies', 'trading volume', 'gainers', 'losers', 'gainers and losers', 'exchanges', 'nft collection', 'blockchains', 'fdv', 'fully diluted valuation', 'trending coin', 'trending crypto', 'market', 'markets', 'crypto market', 'ohlc', 'history', 'public treasury', ''],


}

export default function MaintenanceLayout({ children }) {


    return (

        <Container>

            {children}
        </Container>
    )
}