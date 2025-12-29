# Hosting on GitHub Pages

You are almost there! Follow these steps to put your website online.

## Step 1: Create a Repository on GitHub
1. Go to [github.com](https://github.com) and sign in.
2. Click the **+** icon in the top right and select **New repository**.
3. Name it `algeria-shop` (or any name you like).
4. **Important**: Keep it "Public" (for free hosting).
5. Do NOT check "Initialize with README" (since we already have code).
6. Click **Create repository**.

## Step 2: Push your code
Copy the commands shown on GitHub under "…or push an existing repository from the command line". They will look like this (replace `YOUR-USERNAME` with your actual GitHub username):

```bash
git remote add origin https://github.com/YOUR-USERNAME/algeria-shop.git
git branch -M main
git push -u origin main
```

Run these commands in your VS Code terminal (Terminal -> New Terminal).

## Step 3: Deploy
Once you have pushed your code, run this command in your terminal:

```bash
npm run deploy
```

## Step 4: Configure GitHub Pages
1. Go to your repository settings on GitHub.
2. Click on **Pages** in the left sidebar.
3. Under "Build and deployment", ensure source is **Deploy from a branch**.
4. The branch should be `gh-pages` (it will be created automatically after Step 3).
5. Click **Save** if needed.
6. Refresh the page after a minute, and you will see your live website URL!
