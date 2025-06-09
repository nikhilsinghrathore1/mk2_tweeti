import express from "express";
import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.use(express.json());


function verifySignature(payload, signature) {
  if (!WEBHOOK_SECRET) return true; 
  
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(`sha256=${expectedSignature}`),
    Buffer.from(signature || '')
  );
}

// GitHub webhook endpoint
app.post('/webhook', async (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);
  
  // Verify webhook signature
  if (!verifySignature(payload, signature)) {
    console.log('❌ Invalid webhook signature');
    return res.status(401).send('Unauthorized');
  }
  
  const event = req.headers['x-github-event'];
  console.log(`📨 Received ${event} event`);
  
  // Handle push events (new commits)
  if (event === 'push') {
    await handleNewCommits(req.body);
  }
  
  res.status(200).send('OK');
});

async function handleNewCommits(payload) {
  const { repository, commits, pusher, ref } = payload;
  
  console.log(`\n🔔 New commits in ${repository.full_name}`);
  console.log(`👤 Pushed by: ${pusher.name}`);
  console.log(`🌿 Branch: ${ref.replace('refs/heads/', '')}`);
  console.log(`📝 ${commits.length} commit(s)`);
  
  // Process each commit
  for (const commit of commits) {
    console.log(`\n--- Commit Details ---`);
    console.log(`🆔 ID: ${commit.id.substring(0, 7)}`);
    console.log(`💬 Message: ${commit.message}`);
    console.log(`👨‍💻 Author: ${commit.author.name}`);
    console.log(`⏰ Time: ${new Date(commit.timestamp).toLocaleString()}`);
    
    // Get detailed commit info including code changes
    const commitDetails = await getCommitDetails(
      repository.owner.login,
      repository.name,
      commit.id
    );
    
    if (commitDetails) {
      console.log(`📊 Stats: +${commitDetails.stats.additions} -${commitDetails.stats.deletions}`);
      console.log(`📁 Files changed: ${commitDetails.files.length}`);
      
      // Log changed files
      commitDetails.files.forEach(file => {
        console.log(`  📄 ${file.status}: ${file.filename}`);
      });
    }
    
    // Send to your backend/process the commit
    await processCommit({
      repository: repository.full_name,
      commit: {
        id: commit.id,
        message: commit.message,
        author: commit.author,
        timestamp: commit.timestamp,
        url: commit.url
      },
      changes: commitDetails
    });
  }
}

async function getCommitDetails(owner, repo, sha) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits/${sha}`,
      {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Webhook-App'
        }
      }
    );
    
    return {
      files: response.data.files || [],
      stats: response.data.stats || { additions: 0, deletions: 0, total: 0 }
    };
  } catch (error) {
    console.error(`❌ Error fetching commit details: ${error.message}`);
    return null;
  }
}

async function processCommit(data) {
  console.log(`\n🔄 Processing commit: ${data.commit.id.substring(0, 7)}`);
  
  // This is where you add your custom logic
  // Examples:
  
  // 1. Log the commit data
  console.log('📋 Commit Data:', JSON.stringify(data, null, 2));
  
  // 2. Send to your backend API
  // try {
  //   await axios.post('https://your-backend.com/api/commits', data);
  //   console.log('✅ Sent to backend successfully');
  // } catch (error) {
  //   console.error('❌ Failed to send to backend:', error.message);
  // }
  
  // 3. Send notification
  // await sendNotification(`New commit by ${data.commit.author.name}: ${data.commit.message}`);
  
  console.log('✅ Commit processed');
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GitHub webhook server running on port ${PORT}`);
  console.log(`📡 Webhook URL: http://localhost:${PORT}/webhook`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});