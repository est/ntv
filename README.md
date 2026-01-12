# NTV - Streaming Demo

A Vercel project demonstrating bidirectional streaming with ANSI color output.

Current status: broken. Vercel buffers all request body.

## Features

- **Request Streaming**: Accepts PUT streaming
- **Response Streaming**: Echoes back each line wrapped in random ANSI colors
- **Real-time Processing**: Processes data as it arrives, no buffering

## Usage

### Test Locally

```bash
# Install Vercel CLI if needed
npm install -g vercel

# Start dev server
vercel dev
```

Then in another terminal:

```bash
# Stream input to the server
echo -e "Hello\nWorld\nStreaming\nDemo" | curl -NT- http://localhost:3000/
```

Or interactively:

```bash
# Type lines and see them echoed back in color
curl -NT- http://localhost:3000/
```

### Deploy to Vercel

```bash
vercel --prod
```

Then use your deployed URL:

```bash
echo -e "Hello\nWorld" | curl -NT- https://your-project.vercel.app/
```

## How It Works

1. The API endpoint disables body parsing to handle raw streaming data
2. As data chunks arrive, they're buffered and split into lines
3. Each complete line is immediately echoed back with a random ANSI color
4. The connection stays open until the client closes it

## ANSI Colors Used

- Red, Green, Yellow, Blue, Magenta, Cyan
- Bright variants of all colors
- Random selection for each line
