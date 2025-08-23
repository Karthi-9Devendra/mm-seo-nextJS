import { useState } from 'react';
import { Calendar, Clock, X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { makeAuthenticatedRequest } from '../utils/supabase/client';


interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  imageUrl: string;
}

interface User {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
  };
}

interface AppointmentBookingProps {
  doctor: Doctor;
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

export function AppointmentBooking({ doctor, user, onClose, onSuccess }: AppointmentBookingProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate available dates (next 30 days, excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        });
      }
    }
    
    return dates.slice(0, 14); // Show next 2 weeks of business days
  };

  // Available time slots
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      setError('Please select both date and time');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Dummy API call simulation
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Optionally, you could log the booking data here
      // console.log({ selectedDate, selectedTime, reason, doctor, user });

      onSuccess();
    } catch (err) {
      console.error('Error booking appointment:', err);
      setError(err instanceof Error ? err.message : 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const availableDates = getAvailableDates();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Book Appointment</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Doctor Info */}
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <img
              src={doctor.imageUrl}
              alt={`Dr. ${doctor.name}`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{doctor.name} {doctor.title}</p>
              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
            </div>
          </div>

          {/* Patient Info */}
          <div className="space-y-3">
            <Label>Patient Information</Label>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium">{user.user_metadata?.name || 'Patient'}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date Selection */}
            <div className="space-y-2">
              <Label htmlFor="date">Select Date</Label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger id="date">
                  <SelectValue placeholder="Choose an available date">
                    {selectedDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {availableDates.find(d => d.value === selectedDate)?.label}
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {availableDates.map(date => (
                    <SelectItem key={date.value} value={date.value}>
                      {date.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <Label htmlFor="time">Select Time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Choose an available time">
                    {selectedTime && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {selectedTime}
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reason for Visit */}
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Visit (Optional)</Label>
              <Textarea
                id="reason"
                placeholder="Brief description of your symptoms or reason for the visit..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Booking...
                  </>
                ) : (
                  'Book Appointment'
                )}
              </Button>
            </div>
          </form>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground p-3 bg-muted rounded-lg">
            <p>
              <strong>Note:</strong> This appointment request will be sent to the doctor's office for confirmation. 
              You will receive a confirmation email once your appointment is approved.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}