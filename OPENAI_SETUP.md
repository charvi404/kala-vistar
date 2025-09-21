# OpenAI API Setup Instructions

## 🔧 Configuration Steps

### 1. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Create a new API key
4. Copy the API key

### 2. Update Environment Variables

Edit the `.env` file and replace the placeholder:

```env
# Replace this line:
OPENAI_API_KEY=your_openai_api_key_here

# With your actual API key:
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

### 3. Restart the Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
node server.js
```

## 🚀 Features

- **OpenAI GPT-3.5-turbo**: Intelligent responses for market analysis
- **Fallback System**: Works even without API key (basic responses)
- **Footfall Analysis**: Real-time data visualization
- **Multi-Market Support**: Main Market, Dilli Haat, Sarojini Nagar

## 🧪 Testing

Test the integration with these queries:

- "Hello" - Basic greeting
- "Show me footfall data" - Data analysis
- "Footfall data for Dilli Haat" - Market-specific data
- "Compare markets" - Market comparison

## 📊 API Usage

The application uses OpenAI's GPT-3.5-turbo model with:

- **Max Tokens**: 1000
- **Temperature**: 0.7
- **Model**: gpt-3.5-turbo

## 🔒 Security

- API key is stored in `.env` file (not committed to git)
- Fallback responses ensure app works without API key
- Error handling prevents crashes

## 💡 Troubleshooting

If you see fallback responses instead of AI responses:

1. Check your API key is correct
2. Verify you have OpenAI credits
3. Check server logs for error messages
4. Ensure `.env` file is in the project root
