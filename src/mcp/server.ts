import express, { Request, Response } from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from 'zod';

const app = express();
app.use(express.json());

app.post('/mcp/hello', async (req: Request, res: Response) => {

    try {
        console.log('=== MCP Request Received ===');
        console.log('Headers:', req.headers);
        console.log('Body:', JSON.stringify(req.body, null, 2));

        const server = getServer();
        registerEchoTool(server);

        // Log available methods
        console.log('=== Available MCP Methods ===');
        // Note: We'll need to check what methods are actually registered
        console.log('Server created with echo tool registered');

        const transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: undefined,
        });

        console.log('=== Transport Created ===');
        console.log('Transport type:', transport.constructor.name);

        res.on('close', () => {
            console.log('Connection closed');
            transport.close();
            server.close();
        });

        console.log('=== Connecting Server to Transport ===');
        await server.connect(transport);
        console.log('Server connected to transport successfully');

        console.log('=== Handling Request ===');
        await transport.handleRequest(req, res, req.body);
        console.log('Request handled');

    } catch (error) {
        console.error('=== Error in MCP Handler ===');
        console.error('Error:', error);
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        res.status(500).json({ error: 'Internal server error' });
    }

});

function getServer() {
    console.log('=== Creating MCP Server ===');
    const server = new McpServer({
        name: 'tour-mcp-server',
        version: '1.0.0',
        description: 'Tour MCP Server',
    });
    console.log('MCP Server created:', server);
    return server;
}

function registerEchoTool(server: McpServer) {
    console.log('=== Registering Echo Tool ===');
    server.registerTool(
        "echo",
        {
            title: "Echo Tool",
            description: "Echoes back the provided message",
            inputSchema: { message: z.string() }
        },
        async ({ message }) => {
            console.log('=== Echo Tool Called ===');
            console.log('Message received:', message);
            const result = {
                content: [{ type: "text" as const, text: `Tool echo: ${message}` }]
            };
            console.log('Echo tool result:', result);
            return result;
        }
    );
    console.log('MCP Server updated:', server);
    console.log('Echo tool registered successfully');
}

// Start the Express server
const PORT = process.env['PORT'] || 3000;
app.listen(PORT, () => {
    console.log(`MCP Server running on port ${PORT}`);
    console.log(`MCP endpoint available at http://localhost:${PORT}/mcp/hello`);
});
