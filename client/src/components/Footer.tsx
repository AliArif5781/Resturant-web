import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">About Us</h3>
            <p className="text-muted-foreground mb-4">
              Bringing authentic Pakistani flavors to your table since 2020. Experience the taste of tradition with every bite.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover-elevate active-elevate-2 p-2 rounded-md" data-testid="link-facebook">
                <SiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover-elevate active-elevate-2 p-2 rounded-md" data-testid="link-instagram">
                <SiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover-elevate active-elevate-2 p-2 rounded-md" data-testid="link-twitter">
                <SiX className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-muted-foreground">123 Food Street, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">info@zaika.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Hours</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5" />
                <div className="text-muted-foreground">
                  <p>Monday - Friday: 11am - 11pm</p>
                  <p>Saturday - Sunday: 10am - 12am</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Zaika Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
