declare module 'together-ai' {
  interface TogetherChatCompletionChoice {
    index: number;
    message: {
      role: string;
      content: string;
    };
    delta?: {
      content: string;
    };
    finish_reason: string;
    logprobs: any | null;
  }

  interface TogetherChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: TogetherChatCompletionChoice[];
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  }

  interface TogetherChatCompletionMessageContent {
    type: string;
    text?: string;
    image_url?: {
      url: string;
    };
  }

  interface TogetherChatCompletionMessage {
    role: string;
    content: string | TogetherChatCompletionMessageContent[];
  }

  interface TogetherChatCompletionOptions {
    model: string;
    messages: TogetherChatCompletionMessage[];
    temperature?: number;
    max_tokens?: number;
    stream?: boolean;
  }

  class TogetherChatCompletions {
    create(options: TogetherChatCompletionOptions): Promise<TogetherChatCompletionResponse>;
    stream(options: TogetherChatCompletionOptions): Promise<AsyncIterableIterator<any>>;
  }

  class Together {
    constructor(apiKey?: string);
    chat: {
      completions: TogetherChatCompletions;
    };
  }

  export default Together;
} 