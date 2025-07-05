# Blog Summariser

A modern web application that automatically scrapes blog content from URLs, generates AI-powered summaries, translates them to Urdu, and stores the data in both Supabase and MongoDB.

## Features

- **Web Scraping**: Automatically extracts text content from blog URLs using Cheerio
- **AI Summarization**: Generates intelligent summaries using node-summarizer library
- **Urdu Translation**: Translates summaries to Urdu using translation API
- **Dual Database Storage**: 
  - Full text content stored in MongoDB
  - Summaries and translations stored in Supabase
- **Modern UI**: Built with ShadCN UI components and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Processing**: Instant feedback with loading states

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - Modern component library
- **Axios** - HTTP client for API requests

### Backend
- **Next.js API Routes** - Server-side API endpoints
- **Cheerio** - Web scraping and HTML parsing
- **Node-Summarizer** - AI-powered text summarization
- **MongoDB** - NoSQL database for full text storage
- **Supabase** - PostgreSQL database for summaries and translations

### Deployment
- **Vercel** - Cloud platform for deployment
- **Environment Variables** - Secure configuration management

## Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- MongoDB database (local or cloud)
- Supabase project with database
- Translation API endpoint (currently configured for localhost:5000)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
MONGO_URL=your_mongodb_connection_string
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rameen-Saleem/Nexium_Rameen_Assign2
   cd blog-summariser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your database credentials

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Start summarizing blogs!

## Usage

1. **Enter a Blog URL**: Paste any blog URL into the input field
2. **Click Summarise**: The app will automatically:
   - Scrape the blog content
   - Generate an AI summary
   - Translate to Urdu
   - Save data to both databases
3. **View Results**: See both the English summary and Urdu translation

## Database Schema

### MongoDB (Full Text Storage)
```javascript
{
  url: String,
  fullText: String
}
```

### Supabase (Summaries & Translations)
```sql
CREATE TABLE "Blog-summarizer" (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  summary TEXT NOT NULL,
  urdu TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### POST `/api/summarize`
Processes a blog URL and returns summary data.

**Request Body:**
```json
{
  "url": "https://example-blog.com/article"
}
```

**Response:**
```json
{
  "success": true,
  "summary": "Generated summary text...",
  "urdu": "اردو ترجمہ..."
}
```


