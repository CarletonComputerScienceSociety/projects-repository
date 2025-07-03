# Projects Repository

This Repository showcases projects made by Carleton University students and alumni.

You will need the following:

- [Node.js](https://nodejs.org/en)

## 📦 Setup

To setup the Projects Repository, run the following commands:

```
npm install
npm run dev
```

Alternatively, you can run `npm i` instead of `npm install`.

## ✅ Testing

To run tests on the Projects Repository, run the following command:

```
npm run test
```

## 🎨 Formatting

To format the project repository, run the following command:

```
npm run format
```

## 🛠️ Adding a New Project

1. Create a folder under content/projects/
2. Inside that folder, create an index.md file with the following frontmatter:

```
---
id: "another-project"
title: "Another Project"
description: "This is a description of another project that showcases my skills in React Native and AR technology."
author: "Your name"
tags:
  - Example Tag
  - React Native
  - AR
githubUrl: "https://github.com/"
previewImageUrl: "./placeholder.svg"
---
```

3. (Optional) Add a preview image to the same folder and reference it using the `previewImageUrl` field. The placeholder image should live within their projects folder.
