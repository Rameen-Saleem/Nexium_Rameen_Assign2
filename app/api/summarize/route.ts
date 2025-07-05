import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';
import mongoose from 'mongoose';
import { simulateSummary, translateToUrdu } from '@/lib/utils';


// MongoDB Setup
mongoose.connect(process.env.MONGO_URL!);
const BlogSchema = new mongoose.Schema({ url: String, fullText: String });
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

// Supabase Setup
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const $ = cheerio.load(data);
    $('script, iframe, style, noscript').remove();
    const fullText =
      $('article').text() ||
      $('.post-content').text() ||
      $('.content').text() ||
      $('.entry-content').text() ||
      $('main').text() ||
      $('body').text();
    const summary = await simulateSummary(fullText);
    const urdu = await translateToUrdu(summary);
    await Blog.create({ url, fullText });
    const { error } = await supabase.from('Blog-summarizer').insert([{ url, summary, urdu }]);
    if (error) console.error('Supabase insert error:', error);
    return NextResponse.json({ success: true, summary, urdu });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ success: false, error: typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error) || 'Unknown error' }, { status: 500 });
  }
}
