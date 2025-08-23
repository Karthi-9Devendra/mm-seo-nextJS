"use client";
import {  Phone, Mail} from 'lucide-react'; 
import { Button } from './ui/button';
 const Footer = () => {
  return (
      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">M</span>
                </div>
                <span className="text-xl font-bold text-primary">MedMatchNetwork</span>
              </div>
              <p className="text-muted-foreground">
                Connect with the right healthcare providers in your area. Find doctors, read reviews, and book appointments.
              </p>
            </div>

            <div>
              <h3 className="mb-4">For Patients</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-muted-foreground"
                    onClick={() => {
                      // setCurrentPage('states');
                      // window.history.pushState({}, '', '/');
                    }}
                  >
                    Find by State
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-muted-foreground"
                    onClick={() => {
                      // setCurrentPage('specialties');
                      window.history.pushState({}, '', '/specialties');
                    }}
                  >
                    Browse Specialties
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-muted-foreground"
                    onClick={() => {
                      // setCurrentPage('directory');
                      window.history.pushState({}, '', '/doctors');
                    }}
                  >
                    All Doctors
                  </Button>
                </li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground">Patient Reviews</Button></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4">For Doctors</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-muted-foreground"
                    onClick={() => (true)}
                  >
                    Join Our Network
                  </Button>
                </li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground">Update Profile</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground">Practice Management</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground">Resources</Button></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4">Contact</h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>support@medmatchnetwork.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 MedMatchNetwork. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}
export default Footer;