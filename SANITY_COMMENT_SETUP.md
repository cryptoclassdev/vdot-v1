# Sanity Comment System Setup

## Step 1: Add Comment Schema to Sanity Studio

1. In your Sanity Studio project, navigate to the `schemas` folder
2. Create a new file called `comment.ts` (or `comment.js`)
3. Copy the content from `sanity-schema-comment.ts` in this project
4. Add the comment schema to your schema types in `schemas/index.ts`:

\`\`\`typescript
import comment from './comment'

export const schemaTypes = [
  // ... your existing schemas
  comment,
]
\`\`\`

## Step 2: Create Sanity API Token with Editor Permissions

1. Go to your Sanity project dashboard at https://www.sanity.io/manage
2. Select your project
3. Navigate to **API** → **Tokens**
4. Click **Add API token**
5. Give it a name (e.g., "Blog Comments API")
6. Set permissions to **Editor** (required for creating comments)
7. Click **Add token**
8. **Copy the token immediately** (you won't be able to see it again)

## Step 3: Configure Environment Variable in v0

### For v0 Preview:

1. In the v0 chat interface, click on the **sidebar icon** on the left
2. Select **Vars** (Variables section)
3. Click **Add Variable**
4. Add the following:
   - **Key**: `SANITY_API_TOKEN`
   - **Value**: [Paste your Sanity API token here]
5. Click **Save**

**Important Notes:**
- The variable name MUST be exactly `SANITY_API_TOKEN` (without `NEXT_PUBLIC_` prefix)
- This is a server-only variable and will not be exposed to the client
- The token needs **Editor** permissions to create comments

### For Production Deployment:

If you deploy to Vercel:
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add `SANITY_API_TOKEN` with your token value
4. Redeploy your application

## Step 4: Deploy Sanity Studio

Run the following command in your Sanity Studio project:

\`\`\`bash
npm run deploy
\`\`\`

## Step 5: Test the Comment System

1. Navigate to any blog post on your site
2. Scroll to the bottom to find the comment form
3. Fill in name, email, and comment
4. Submit the form
5. You should see "Your comment is awaiting moderation" message
6. Check your Sanity Studio to see the new comment document

## Step 6: Approve Comments

1. Log in to your Sanity Studio
2. You'll see a new "Comment" document type in the sidebar
3. To approve comments:
   - Open a comment document
   - Toggle the "Approved" field to `true`
   - Click **Publish**
4. Only approved comments will appear on the blog posts

## Troubleshooting

### "SANITY_API_TOKEN is missing" Error
- Make sure you've added the token to the Vars section in v0
- The variable name must be exactly `SANITY_API_TOKEN`
- Refresh the preview after adding the variable

### "Insufficient permissions" Error
- Your token needs **Editor** permissions (not Viewer or Contributor)
- Create a new token with Editor permissions in Sanity
- Update the token in your environment variables

### Comments Not Showing
- Comments need to be approved in Sanity Studio first
- Check that the "approved" field is set to `true`
- Make sure the comment is published in Sanity

## Features

- ✅ Comment form with name, email, and comment fields
- ✅ Comments saved to Sanity CMS
- ✅ Moderation system (approved field)
- ✅ "Awaiting moderation" message after submission
- ✅ Display approved comments with timestamps
- ✅ Matches existing design colors (brand-cyan, brand-orange)
- ✅ Responsive design
- ✅ Email validation
- ✅ Error handling and helpful error messages
