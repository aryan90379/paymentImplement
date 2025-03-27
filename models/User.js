import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ArticleSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },  // For URL-friendly article names
    content: { type: String, required: true },  // The main content of the article
    author: { type: String, required: true },  // Author of the article
    publishedAt: { type: Date, default: Date.now },  // Date when the article is published
    updatedAt: { type: Date, default: Date.now },  // Date when the article is updated
    tags: [{ type: String }],  // Tags for categorizing articles
    coverImage: { type: String },  // URL to cover image for the article
    metaTitle: { type: String },  // Meta title for SEO
    metaDescription: { type: String },  // Meta description for SEO
    metaKeywords: [{ type: String }],  // Meta keywords for SEO
    metaImage: { type: String },  // Meta image for SEO (Open Graph or Twitter card)
    metaAuthor: { type: String },  // Author for meta data
    canonicalURL: { type: String },  // To specify the preferred version of the article URL for SEO
    isPublished: { type: Boolean, default: true },  // To track if article is live
    seoScore: { type: Number, default: 100 },  // A field to track the SEO score (optional)
    // Optional additional fields for SEO
    robotsMetaTag: { type: String, enum: ['index', 'noindex'], default: 'index' },  // Robots meta tag for indexing
    socialMetaTags: {
        twitterCard: { type: String, enum: ['summary', 'summary_large_image', 'app', 'player'], default: 'summary' },
        ogType: { type: String, enum: ['website', 'article'], default: 'article' },
        ogUrl: { type: String },  // Open Graph URL
        ogImage: { type: String },  // Open Graph image URL
    },
    createdAt: { type: Date, default: Date.now },  // Created date for article
    updatedAt: { type: Date, default: Date.now },  // Updated date for article
});

export default mongoose.models.Article || model("Article", ArticleSchema);
