import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Clock, Filter, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  experience: string;
  image: string;
  availability: string;
  price: number;
  languages: string[];
}

interface DoctorListingProps {
  onDoctorSelect: (doctorId: string) => void;
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviews: 245,
    location: 'Downtown Medical Center',
    experience: '12 years',
    image: '/placeholder.svg',
    availability: 'Available today',
    price: 150,
    languages: ['English', 'Spanish']
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    rating: 4.8,
    reviews: 189,
    location: 'Skin Care Clinic',
    experience: '8 years',
    image: '/placeholder.svg',
    availability: 'Next available: Tomorrow',
    price: 120,
    languages: ['English', 'Mandarin']
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    rating: 4.9,
    reviews: 312,
    location: 'Children\'s Health Center',
    experience: '15 years',
    image: '/placeholder.svg',
    availability: 'Available today',
    price: 100,
    languages: ['English', 'Spanish', 'French']
  },
  {
    id: '4',
    name: 'Dr. David Thompson',
    specialty: 'Orthopedic',
    rating: 4.7,
    reviews: 156,
    location: 'Sports Medicine Institute',
    experience: '10 years',
    image: '/placeholder.svg',
    availability: 'Next available: Friday',
    price: 180,
    languages: ['English']
  },
  {
    id: '5',
    name: 'Dr. Lisa Park',
    specialty: 'Psychiatrist',
    rating: 4.8,
    reviews: 203,
    location: 'Mental Health Center',
    experience: '9 years',
    image: '/placeholder.svg',
    availability: 'Available today',
    price: 200,
    languages: ['English', 'Korean']
  },
  {
    id: '6',
    name: 'Dr. James Wilson',
    specialty: 'General Medicine',
    rating: 4.6,
    reviews: 421,
    location: 'Family Health Clinic',
    experience: '20 years',
    image: '/placeholder.svg',
    availability: 'Available today',
    price: 80,
    languages: ['English']
  }
];

const DoctorListing = ({ onDoctorSelect }: DoctorListingProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const specialties = ['all', 'Cardiologist', 'Dermatologist', 'Pediatrician', 'Orthopedic', 'Psychiatrist', 'General Medicine'];
  const locations = ['all', 'Downtown Medical Center', 'Skin Care Clinic', 'Children\'s Health Center', 'Sports Medicine Institute', 'Mental Health Center', 'Family Health Clinic'];

  const filteredDoctors = mockDoctors
    .filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
      const matchesLocation = selectedLocation === 'all' || doctor.location === selectedLocation;
      
      return matchesSearch && matchesSpecialty && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.price - b.price;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">Find Your Doctor</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our network of qualified healthcare professionals and book appointments with ease.
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Search & Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Search</label>
              <Input
                placeholder="Search doctors or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Specialty</label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty === 'all' ? 'All Specialties' : specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Location</label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Sort by</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price">Lowest Price</SelectItem>
                  <SelectItem value="experience">Most Experience</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-4">
        <p className="text-muted-foreground">
          {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-medical transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={doctor.image} alt={doctor.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">{doctor.name}</h3>
                  <p className="text-primary font-medium">{doctor.specialty}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{doctor.rating}</span>
                    <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{doctor.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{doctor.experience} experience</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {doctor.languages.slice(0, 2).map(lang => (
                      <Badge key={lang} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                    {doctor.languages.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{doctor.languages.length - 2}
                      </Badge>
                    )}
                  </div>
                  <span className="text-lg font-semibold text-foreground">${doctor.price}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-1">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      doctor.availability.includes('Available today') ? "bg-success" : "bg-warning"
                    )} />
                    <span className="text-sm text-muted-foreground">{doctor.availability}</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => onDoctorSelect(doctor.id)}
                className="w-full mt-4 flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No doctors found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria to find more results.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorListing;