import {
  WalletBalance,
  Transaction,
  TopUpRequest,
  TopUpResponse,
  UsageStats,
  PaymentMethod,
} from '../walletService';

class MockWalletService {
  private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  private balance = 50000;
  private transactions: Transaction[] = this.generateMockTransactions();

  private generateMockTransactions(): Transaction[] {
    const types: Array<'credit' | 'debit'> = ['credit', 'debit'];
    const descriptions = [
      'Address verification - Single lookup',
      'Wallet top-up via card',
      'Bulk verification - 50 addresses',
      'Refund for failed verification',
      'Identity document verification',
    ];

    return Array.from({ length: 30 }, (_, i) => ({
      id: `txn-${String(i + 1).padStart(8, '0')}`,
      type: i % 3 === 0 ? 'credit' : 'debit',
      amount: i % 3 === 0 ? 10000 + Math.random() * 40000 : 50 + Math.random() * 450,
      currency: 'NGN',
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      status: 'completed' as const,
      createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
      reference: `REF-${Date.now()}-${i}`,
    }));
  }

  async getBalance(): Promise<WalletBalance> {
    await this.delay(400);

    return {
      balance: this.balance,
      currency: 'NGN',
      lastUpdated: new Date().toISOString(),
    };
  }

  async getTransactions(params?: any): Promise<any> {
    await this.delay(600);

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    let filtered = [...this.transactions];
    
    if (params?.type) {
      filtered = filtered.filter(t => t.type === params.type);
    }
    
    if (params?.status) {
      filtered = filtered.filter(t => t.status === params.status);
    }

    return {
      transactions: filtered.slice(start, end),
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit),
    };
  }

  async topUp(data: TopUpRequest): Promise<TopUpResponse> {
    await this.delay(1500);

    this.balance += data.amount;

    const transaction: Transaction = {
      id: `txn-${Date.now()}`,
      type: 'credit',
      amount: data.amount,
      currency: data.currency || 'NGN',
      description: `Wallet top-up via ${data.paymentMethod}`,
      status: 'completed',
      createdAt: new Date().toISOString(),
      reference: `REF-${Date.now()}`,
    };

    this.transactions.unshift(transaction);

    return {
      transaction_id: transaction.id,
      payment_url: undefined,
      status: 'completed',
      message: 'Wallet topped up successfully',
    };
  }

  async getUsageStats(): Promise<UsageStats> {
    await this.delay(500);

    return {
      currentPlan: 'pro',
      monthlyLimit: 5000,
      usedThisMonth: 387,
      remainingVerifications: 4613,
      resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(),
    };
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    await this.delay(400);

    return [
      {
        id: 'pm-001',
        type: 'card',
        last4: '4242',
        brand: 'visa',
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true,
      },
      {
        id: 'pm-002',
        type: 'card',
        last4: '5555',
        brand: 'mastercard',
        expiryMonth: 8,
        expiryYear: 2026,
        isDefault: false,
      },
    ];
  }

  async addPaymentMethod(data: any): Promise<PaymentMethod> {
    await this.delay(800);

    return {
      id: `pm-${Date.now()}`,
      type: 'card',
      last4: data.cardNumber?.slice(-4) || '0000',
      brand: 'visa',
      expiryMonth: parseInt(data.expiryMonth) || 12,
      expiryYear: parseInt(data.expiryYear) || 2025,
      isDefault: false,
    };
  }

  async removePaymentMethod(methodId: string): Promise<{ message: string }> {
    await this.delay(500);

    return {
      message: 'Payment method removed successfully',
    };
  }

  async setDefaultPaymentMethod(methodId: string): Promise<{ message: string }> {
    await this.delay(500);

    return {
      message: 'Default payment method updated',
    };
  }

  async downloadInvoice(transactionId: string): Promise<Blob> {
    await this.delay(600);

    const invoiceContent = `ARISE VERIFICATION\nInvoice #${transactionId}\n\nAmount: ₦500\nDate: ${new Date().toLocaleDateString()}\n`;
    
    return new Blob([invoiceContent], { type: 'text/plain' });
  }
}

export const mockWalletService = new MockWalletService();
