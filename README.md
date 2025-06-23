```markdown
# 🎨 mk2_tweeti: Your AI-Powered Twitter Bot 🚀

```ascii
                                     _.--""--._
                                   .'          `.
                                  /   O      O   \
                                 |    \  ^^  /    |
                                 \     `----'     /
                                  `. _______ .'
                                    //_____\\
                                   (( ____ ))
                                    `-----'
                                 AI-Powered Tweets
```

**Tagline:** Effortlessly generate and tweet engaging content using the power of Gemini and GitHub webhooks! ✨

<br>

[![npm](https://img.shields.io/npm/v/mk2_tweeti?style=for-the-badge)](https://www.npmjs.com/)
[![License](https://img.shields.io/github/license/nikhilsinghrathore1/mk2_tweeti?style=for-the-badge)](https://github.com/nikhilsinghrathore1/mk2_tweeti/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/nikhilsinghrathore1/mk2_tweeti?style=for-the-badge)](https://github.com/nikhilsinghrathore1/mk2_tweeti/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/nikhilsinghrathore1/mk2_tweeti?style=for-the-badge)](https://github.com/nikhilsinghrathore1/mk2_tweeti/issues)
[![Node.js](https://img.shields.io/badge/node.js-v18+-brightgreen.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/express.js-4.18+-brightgreen.svg?style=for-the-badge&logo=express)](https://expressjs.com/)  
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-blue.svg?style=for-the-badge)](https://developers.generativeai.google/) 
[![Twitter API v2](https://img.shields.io/badge/Twitter%20API-v2-1DA1F2.svg?style=for-the-badge&logo=twitter)](https://developer.twitter.com/en/docs/twitter-api) 
[![Axios](https://img.shields.io/badge/axios-0.27+-blue.svg?style=for-the-badge&logo=axios)](https://axios-http.com/)
[![pnpm](https://img.shields.io/badge/pnpm-v8+-brightgreen.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)


<br>

---

## 🌟 Feature Highlights 💫

* 🚀 **AI-Powered Tweet Generation:**  Leverages Google Gemini to create engaging tweets based on prompts.
* 🤖 **GitHub Webhook Integration:** Automatically generates tweets upon new commits to your repository.
* 🐦 **Image Support:** Tweets can include images fetched from a specified URL.
* 📝 **Customizable Prompts:** Fine-tune tweet generation with detailed prompts.
* ⏱️ **Tweet Scheduling (Future Feature):** Plan your tweets for optimal engagement.
* 📊 **Analytics Dashboard (Future Feature):** Track tweet performance and engagement metrics.
* ⚙️ **Easy Configuration:** Simple setup with environment variables.


<br>

---

## 🛠️ Tech Stack 📦

| Technology       | Badge                                                                     |
|-----------------|--------------------------------------------------------------------------|
| Node.js          | [![Node.js](https://img.shields.io/badge/node.js-v18+-brightgreen.svg?style=for-the-badge&logo=node.js)](https://nodejs.org/) |
| Express.js       | [![Express.js](https://img.shields.io/badge/express.js-4.18+-brightgreen.svg?style=for-the-badge&logo=express)](https://expressjs.com/)  |
| Google Gemini    | [![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-blue.svg?style=for-the-badge)](https://developers.generativeai.google/) |
| Twitter API v2   | [![Twitter API v2](https://img.shields.io/badge/Twitter%20API-v2-1DA1F2.svg?style=for-the-badge&logo=twitter)](https://developer.twitter.com/en/docs/twitter-api) |
| Axios            | [![Axios](https://img.shields.io/badge/axios-0.27+-blue.svg?style=for-the-badge&logo=axios)](https://axios-http.com/) |
| Pnpm            | [![pnpm](https://img.shields.io/badge/pnpm-v8+-brightgreen.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/) |


<br>

---

## 🚀 Quick Start ⚡

1. **Clone the repository:** `git clone https://github.com/nikhilsinghrathore1/mk2_tweeti.git`
2. **Install dependencies:** `pnpm install`
3. **Set up environment variables:** Create a `.env` file with your API keys (see Configuration Options).
4. **Start the server:** `pnpm dev`

```bash
# Example .env file
PORT=3000
GITHUB_WEBHOOK_SECRET=your_secret
GEMINI_API_KEY=your_gemini_api_key
XAPIKEY=your_twitter_api_key
XAPIKEYSECRET=your_twitter_api_key_secret
ACCESSTOKEN=your_twitter_access_token
ACCESSTOKENSECRET=your_twitter_access_token_secret
GITHUB_TOKEN=your_github_token
AUTO_TWEET_COMMITS=true # Set to 'true' to automatically tweet commits, 'false' otherwise
```

<br>

---

## 📖 Detailed Usage 📚

This application uses GitHub webhooks to trigger tweet generation on new commits. It also provides a `/tweet` endpoint for manual tweet creation.

**Example 1: Manual Tweet Generation (using the `/tweet` endpoint):**

```javascript
const axios = require('axios');

axios.post('http://localhost:3000/tweet', {
  topic: 'Just pushed a major update to mk2_tweeti! Check it out: [link to repo]'
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});
```

**Example 2:  Webhook Handling (Illustrative Snippet from `server.js`)**

```javascript
// ... (other code) ...

app.post('/webhook', async (req, res) => {
  // ... (signature verification) ...

  if (event === 'push') {
    await handleNewCommits(req.body);
  }

  res.status(200).send('OK');
});

// ... (rest of the code) ...
```

The `/webhook` endpoint in `server.js` handles incoming GitHub webhook events.  It verifies the signature, processes push events, and triggers tweet generation for each commit if `AUTO_TWEET_COMMITS` is set to `true`.  See the full `server.js` file for complete implementation details.


<br>

---

## 🏗️ Project Structure 📁

```
mk2_tweeti/
├── server.js          // Main application file
├── utils/             // Utility functions
│   ├── llm.js        // LLM interaction functions
│   └── signature.js // Signature verification functions
├── package.json       // Project dependencies
├── pnpm-lock.yaml    // Package lock file
└── ...                // Other files
```

<br>

---

## 🎯 API Documentation 📄

| Endpoint       | Method | Description                                           | Request Body             | Response Body                               |
|-----------------|--------|-------------------------------------------------------|--------------------------|-------------------------------------------|
| `/webhook`     | POST    | Handles GitHub webhook events.                       | GitHub webhook payload   | `{ status: 'OK' }`                          |
| `/tweet`        | POST    | Manually generates and posts a tweet.                | `{ topic: 'your topic' }` | `{ message: 'success', tweet: 'tweet text' }` |
| `/health`       | GET     | Health check endpoint.                               | None                     | `{ status: 'OK', timestamp: ... }`         |


<br>

---

## 🔧 Configuration Options ⚙️

| Variable Name              | Description                                                                        | Type     | Default |
|-----------------------------|------------------------------------------------------------------------------------|----------|---------|
| `PORT`                      | Server port.                                                                     | `number` | `3000`   |
| `GITHUB_WEBHOOK_SECRET`     | Secret key for webhook signature verification.                                    | `string` | `null`   |
| `GEMINI_API_KEY`            | Your Google Gemini API key.                                                       | `string` | `null`   |
| `XAPIKEY`                   | Your Twitter API key.                                                             | `string` | `null`   |
| `XAPIKEYSECRET`             | Your Twitter API key secret.                                                      | `string` | `null`   |
| `ACCESSTOKEN`               | Your Twitter access token.                                                        | `string` | `null`   |
| `ACCESSTOKENSECRET`         | Your Twitter access token secret.                                                 | `string` | `null`   |
| `GITHUB_TOKEN`              | Your GitHub personal access token (for fetching detailed commit information).       | `string` | `null`   |
| `AUTO_TWEET_COMMITS`       | Set to 'true' to automatically tweet new commits, 'false' otherwise. | `string` | `false`  |


<br>

---

## 📸 Screenshots/Demo 🖼️

**(Replace placeholders with actual image links)**

[Screenshot 1](placeholder1.jpg)
[Screenshot 2](placeholder2.jpg)
[Screenshot 3](placeholder3.jpg)


<br>

---

## 🤝 Contributing Guidelines 🙌

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with clear messages.
4. Push your branch to your forked repository.
5. Create a pull request to merge your changes into the main branch.


<br>

---

## 📜 License & Acknowledgments 🙏

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC). Thanks to the creators of Express.js, Google Gemini, and the Twitter API v2 for their amazing tools!


<br>

---

## 👥 Contributors ✨

**(Add contributor information here)**


<br>

---

## 📞 Support & Contact 📧

[![Twitter](https://img.shields.io/badge/Twitter-@nikhilsinghrathore1-1DA1F2.svg?style=for-the-badge&logo=twitter)](https://twitter.com/nikhilsinghrathore1)
[![Email](https://img.shields.io/badge/Gmail-nikhilsinghrathore1@gmail.com-red.svg?style=for-the-badge&logo=gmail)](mailto:nikhilsinghrathore1@gmail.com)


<br>

---

## 🗺️ Roadmap

- [ ] Implement tweet scheduling functionality.
- [ ] Develop an analytics dashboard.
- [ ] Add support for multiple social media platforms.
- [ ] Improve error handling and logging.
- [ ] Enhance documentation and examples.


<br>

---

<details><summary><b>Frequently Asked Questions (FAQ)</b></summary>

- **Q: What API keys do I need?** A: You need API keys for Google Gemini and the Twitter API v2. A GitHub Personal Access Token is also required for fetching detailed commit information.

- **Q: How do I set up the GitHub webhook?** A: You'll need to configure a webhook in your GitHub repository settings, pointing to the `/webhook` endpoint of this application.

- **Q: What happens if tweet generation fails?** A: The application includes error handling and logging. It will attempt to gracefully handle failures and log errors for debugging purposes.

</details>
```
