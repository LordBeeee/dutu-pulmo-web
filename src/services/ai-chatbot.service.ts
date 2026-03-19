import axios from 'axios';
import { APP_CONFIG } from '@/constants/config';

export interface AIChatResponse {
  success: boolean;
  data: {
    message: string;
    type: string;
    severity: string;
    timestamp: string;
    disclaimer?: string | null;
    suggestedActions: string[];
  };
  meta: {
    sessionId: string;
    queryType: string;
    processedAt: string;
  };
}

export const aiChatBotService = {
  sendMessage: async (message: string, sessionId?: string): Promise<AIChatResponse> => {
    if (!APP_CONFIG.AI_WEBHOOK_URL) {
      throw new Error('AI Webhook URL is not configured');
    }

    const response = await axios.post<AIChatResponse>(APP_CONFIG.AI_WEBHOOK_URL, {
      message,
      sessionId,
    });

    return response.data;
  },
};
