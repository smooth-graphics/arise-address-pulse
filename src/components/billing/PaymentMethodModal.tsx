import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Plus, Trash2, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentMethodModal({ isOpen, onClose }: PaymentMethodModalProps) {
  const { toast } = useToast();
  const [showAddCard, setShowAddCard] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      brand: 'Visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true,
    },
    {
      id: '2',
      brand: 'Mastercard',
      last4: '8888',
      expiryMonth: '08',
      expiryYear: '2026',
      isDefault: false,
    },
  ]);

  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    const last4 = newCard.cardNumber.slice(-4);
    const brand = newCard.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard';
    
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      brand,
      last4,
      expiryMonth: newCard.expiryMonth,
      expiryYear: newCard.expiryYear,
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods([...paymentMethods, newMethod]);
    setShowAddCard(false);
    setNewCard({
      cardNumber: '',
      cardholderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
    });

    toast({
      title: 'Card Added',
      description: 'Your payment method has been added successfully.',
    });
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );

    toast({
      title: 'Default Payment Updated',
      description: 'Your default payment method has been updated.',
    });
  };

  const handleDeleteCard = () => {
    if (!deleteCardId) return;

    const deletingDefault = paymentMethods.find(m => m.id === deleteCardId)?.isDefault;
    const newMethods = paymentMethods.filter(method => method.id !== deleteCardId);
    
    if (deletingDefault && newMethods.length > 0) {
      newMethods[0].isDefault = true;
    }

    setPaymentMethods(newMethods);
    setDeleteCardId(null);

    toast({
      title: 'Card Removed',
      description: 'Your payment method has been removed.',
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Payment Methods</DialogTitle>
            <DialogDescription>
              Manage your payment methods for subscriptions and top-ups
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Existing Cards */}
            {!showAddCard && (
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {method.brand} •••• {method.last4}
                          </span>
                          {method.isDefault && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Expires {method.expiryMonth}/{method.expiryYear}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!method.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSetDefault(method.id)}
                        >
                          Set as Default
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteCardId(method.id)}
                        disabled={paymentMethods.length === 1}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowAddCard(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Card
                </Button>
              </div>
            )}

            {/* Add New Card Form */}
            {showAddCard && (
              <form onSubmit={handleAddCard} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={newCard.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, '');
                      if (value.length <= 16 && /^\d*$/.test(value)) {
                        setNewCard({ ...newCard, cardNumber: value });
                      }
                    }}
                    required
                    maxLength={16}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    placeholder="John Doe"
                    value={newCard.cardholderName}
                    onChange={(e) =>
                      setNewCard({ ...newCard, cardholderName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryMonth">Month</Label>
                    <Input
                      id="expiryMonth"
                      placeholder="MM"
                      value={newCard.expiryMonth}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 2 && /^\d*$/.test(value)) {
                          setNewCard({ ...newCard, expiryMonth: value });
                        }
                      }}
                      required
                      maxLength={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryYear">Year</Label>
                    <Input
                      id="expiryYear"
                      placeholder="YY"
                      value={newCard.expiryYear}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 2 && /^\d*$/.test(value)) {
                          setNewCard({ ...newCard, expiryYear: value });
                        }
                      }}
                      required
                      maxLength={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      type="password"
                      value={newCard.cvv}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 3 && /^\d*$/.test(value)) {
                          setNewCard({ ...newCard, cvv: value });
                        }
                      }}
                      required
                      maxLength={3}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAddCard(false);
                      setNewCard({
                        cardNumber: '',
                        cardholderName: '',
                        expiryMonth: '',
                        expiryYear: '',
                        cvv: '',
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Card</Button>
                </div>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteCardId} onOpenChange={() => setDeleteCardId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Payment Method?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove this payment method from your account. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCard} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
