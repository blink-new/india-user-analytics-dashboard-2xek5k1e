// India States SVG Path Data and District Information
export interface StateData {
  name: string
  path: string
  districts: string[]
}

export const indiaStatesData: Record<string, StateData> = {
  "Andhra Pradesh": {
    name: "Andhra Pradesh",
    path: "M 420 320 L 480 310 L 490 340 L 500 370 L 480 390 L 450 400 L 420 380 L 410 350 Z",
    districts: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada", "Anantapur", "Chittoor"]
  },
  "Arunachal Pradesh": {
    name: "Arunachal Pradesh",
    path: "M 580 80 L 650 70 L 670 100 L 660 130 L 620 140 L 590 120 Z",
    districts: ["Itanagar", "Tawang", "Bomdila", "Ziro", "Daporijo", "Along", "Pasighat", "Tezu", "Khonsa", "Changlang"]
  },
  "Assam": {
    name: "Assam",
    path: "M 520 120 L 580 110 L 590 140 L 570 160 L 540 170 L 520 150 Z",
    districts: ["Guwahati", "Dibrugarh", "Silchar", "Nagaon", "Tinsukia", "Jorhat", "Bongaigaon", "Dhubri", "Diphu", "Goalpara"]
  },
  "Bihar": {
    name: "Bihar",
    path: "M 420 140 L 480 130 L 500 160 L 480 180 L 450 170 L 430 160 Z",
    districts: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar"]
  },
  "Chhattisgarh": {
    name: "Chhattisgarh",
    path: "M 380 220 L 440 210 L 460 240 L 450 270 L 420 280 L 390 260 L 370 240 Z",
    districts: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Jagdalpur", "Ambikapur", "Chirmiri", "Mahasamund"]
  },
  "Goa": {
    name: "Goa",
    path: "M 260 300 L 280 295 L 285 310 L 275 320 L 260 315 Z",
    districts: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Sanquelim", "Valpoi", "Quepem"]
  },
  "Gujarat": {
    name: "Gujarat",
    path: "M 180 180 L 260 170 L 280 200 L 270 240 L 240 260 L 200 250 L 170 220 Z",
    districts: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Bharuch"]
  },
  "Haryana": {
    name: "Haryana",
    path: "M 300 90 L 360 80 L 380 110 L 350 130 L 320 120 L 310 100 Z",
    districts: ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Sirsa"]
  },
  "Himachal Pradesh": {
    name: "Himachal Pradesh",
    path: "M 280 50 L 360 40 L 380 70 L 350 90 L 320 80 L 290 70 Z",
    districts: ["Shimla", "Dharamshala", "Solan", "Mandi", "Palampur", "Una", "Nahan", "Chamba", "Kullu", "Bilaspur"]
  },
  "Jharkhand": {
    name: "Jharkhand",
    path: "M 440 170 L 500 160 L 520 190 L 500 210 L 470 200 L 450 180 Z",
    districts: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Phusro", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar"]
  },
  "Karnataka": {
    name: "Karnataka",
    path: "M 260 320 L 340 310 L 360 340 L 380 370 L 350 400 L 320 410 L 280 400 L 250 380 L 240 350 Z",
    districts: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davangere", "Bellary", "Bijapur", "Shimoga"]
  },
  "Kerala": {
    name: "Kerala",
    path: "M 240 380 L 280 370 L 290 400 L 300 430 L 280 460 L 250 470 L 220 450 L 210 420 L 220 390 Z",
    districts: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kottayam", "Kannur", "Kasaragod"]
  },
  "Madhya Pradesh": {
    name: "Madhya Pradesh",
    path: "M 260 160 L 360 150 L 390 180 L 380 220 L 350 240 L 320 250 L 280 240 L 250 210 L 240 180 Z",
    districts: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"]
  },
  "Maharashtra": {
    name: "Maharashtra",
    path: "M 260 240 L 340 230 L 370 260 L 380 290 L 360 320 L 330 330 L 300 320 L 270 300 L 250 270 Z",
    districts: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Sangli", "Satara"]
  },
  "Manipur": {
    name: "Manipur",
    path: "M 570 180 L 590 175 L 595 190 L 585 200 L 570 195 Z",
    districts: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Senapati", "Ukhrul", "Chandel", "Tamenglong", "Jiribam", "Kangpokpi"]
  },
  "Meghalaya": {
    name: "Meghalaya",
    path: "M 540 150 L 570 145 L 580 160 L 570 170 L 550 165 L 540 155 Z",
    districts: ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara", "Williamnagar", "Resubelpara", "Ampati", "Mairang", "Khliehriat"]
  },
  "Mizoram": {
    name: "Mizoram",
    path: "M 560 200 L 580 195 L 585 210 L 575 220 L 560 215 L 555 205 Z",
    districts: ["Aizawl", "Lunglei", "Serchhip", "Champhai", "Kolasib", "Lawngtlai", "Saiha", "Mamit", "Hnahthial", "Khawzawl"]
  },
  "Nagaland": {
    name: "Nagaland",
    path: "M 580 140 L 610 135 L 620 150 L 610 165 L 590 160 L 580 150 Z",
    districts: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Kiphire", "Longleng", "Peren", "Mon"]
  },
  "Odisha": {
    name: "Odisha",
    path: "M 440 200 L 500 190 L 520 220 L 510 250 L 480 270 L 450 260 L 430 230 Z",
    districts: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Baripada", "Jharsuguda", "Jeypore"]
  },
  "Punjab": {
    name: "Punjab",
    path: "M 260 70 L 320 60 L 340 90 L 320 110 L 290 100 L 270 80 Z",
    districts: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Firozpur", "Hoshiarpur", "Batala", "Abohar"]
  },
  "Rajasthan": {
    name: "Rajasthan",
    path: "M 180 100 L 280 90 L 310 120 L 300 160 L 270 180 L 240 190 L 200 180 L 170 150 L 160 120 Z",
    districts: ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bharatpur", "Alwar", "Sikar", "Pali"]
  },
  "Sikkim": {
    name: "Sikkim",
    path: "M 500 110 L 520 105 L 525 120 L 515 130 L 500 125 Z",
    districts: ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Pakyong", "Soreng"]
  },
  "Tamil Nadu": {
    name: "Tamil Nadu",
    path: "M 300 400 L 380 390 L 400 420 L 390 450 L 370 480 L 340 490 L 310 480 L 280 460 L 270 430 Z",
    districts: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul"]
  },
  "Telangana": {
    name: "Telangana",
    path: "M 340 260 L 390 250 L 410 280 L 400 310 L 380 320 L 360 310 L 350 290 Z",
    districts: ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Medak"]
  },
  "Tripura": {
    name: "Tripura",
    path: "M 580 180 L 600 175 L 605 190 L 595 200 L 580 195 Z",
    districts: ["Agartala", "Dharmanagar", "Udaipur", "Kailashahar", "Belonia", "Khowai", "Teliamura", "Sabroom"]
  },
  "Uttar Pradesh": {
    name: "Uttar Pradesh",
    path: "M 300 110 L 420 100 L 450 130 L 440 160 L 410 170 L 380 160 L 350 150 L 320 140 Z",
    districts: ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Allahabad", "Bareilly", "Aligarh", "Moradabad"]
  },
  "Uttarakhand": {
    name: "Uttarakhand",
    path: "M 360 70 L 420 60 L 440 90 L 420 110 L 390 100 L 370 80 Z",
    districts: ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Kotdwar", "Manglaur", "Laksar"]
  },
  "West Bengal": {
    name: "West Bengal",
    path: "M 480 140 L 540 130 L 560 160 L 550 190 L 520 200 L 500 180 L 490 160 Z",
    districts: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur"]
  },
  "Andaman and Nicobar Islands": {
    name: "Andaman and Nicobar Islands",
    path: "M 580 400 L 590 395 L 595 410 L 585 420 L 580 415 Z",
    districts: ["Port Blair", "Rangat", "Mayabunder", "Diglipur", "Car Nicobar", "Nancowry", "Great Nicobar"]
  },
  "Chandigarh": {
    name: "Chandigarh",
    path: "M 320 85 L 330 80 L 335 90 L 325 95 Z",
    districts: ["Chandigarh"]
  },
  "Dadra and Nagar Haveli and Daman and Diu": {
    name: "Dadra and Nagar Haveli and Daman and Diu",
    path: "M 220 220 L 240 215 L 245 230 L 235 235 L 220 230 Z",
    districts: ["Daman", "Diu", "Silvassa"]
  },
  "Delhi": {
    name: "Delhi",
    path: "M 340 100 L 360 95 L 365 110 L 355 115 L 345 110 Z",
    districts: ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "North East Delhi", "North West Delhi", "South East Delhi", "South West Delhi", "Central Delhi"]
  },
  "Jammu and Kashmir": {
    name: "Jammu and Kashmir",
    path: "M 240 20 L 340 10 L 370 40 L 360 70 L 320 80 L 280 70 L 250 50 Z",
    districts: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kupwara", "Pulwama", "Rajouri", "Poonch", "Doda", "Kishtwar"]
  },
  "Ladakh": {
    name: "Ladakh",
    path: "M 340 10 L 420 5 L 450 30 L 440 60 L 400 70 L 370 40 Z",
    districts: ["Leh", "Kargil"]
  },
  "Lakshadweep": {
    name: "Lakshadweep",
    path: "M 180 380 L 190 375 L 195 385 L 185 390 Z",
    districts: ["Kavaratti", "Agatti", "Minicoy"]
  },
  "Puducherry": {
    name: "Puducherry",
    path: "M 350 420 L 360 415 L 365 425 L 355 430 Z",
    districts: ["Puducherry", "Karaikal", "Mahe", "Yanam"]
  }
}

// Color schemes for different user statuses
export const statusColors = {
  active: {
    light: '#dcfce7',
    medium: '#86efac',
    dark: '#16a34a'
  },
  dormant: {
    light: '#fef3c7',
    medium: '#fbbf24',
    dark: '#d97706'
  },
  migrated: {
    light: '#dbeafe',
    medium: '#60a5fa',
    dark: '#2563eb'
  }
}

// Function to get color intensity based on user count
export const getColorIntensity = (count: number, maxCount: number): 'light' | 'medium' | 'dark' => {
  if (count === 0) return 'light'
  const ratio = count / maxCount
  if (ratio > 0.7) return 'dark'
  if (ratio > 0.3) return 'medium'
  return 'light'
}