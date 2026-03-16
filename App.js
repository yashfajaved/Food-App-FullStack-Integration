import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const THEME = {
  primary: '#2D0B12', 
  accent: '#F3E5AB',  
  muted: '#8E6B72',
  glass: 'rgba(255, 255, 255, 0.08)',
  goldGradient: ['#F3E5AB', '#D4AF37'],
};

// --- DATA STRUCTURES ---
const MENU_CATEGORIES = {
  "Brewed Teas": [
    { id: 101, name: "Kashmiri Chai", price: 150, img: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg" },
    { id: 102, name: "Saffron Tea", price: 250, img: "https://images.pexels.com/photos/230490/pexels-photo-230490.jpeg" },
    { id: 103, name: "Cardamom Tea", price: 120, img: "https://images.pexels.com/photos/849646/pexels-photo-849646.jpeg" },
    { id: 104, name: "Lemon Tea", price: 180, img: "https://images.pexels.com/photos/1170599/pexels-photo-1170599.jpeg" },
    { id: 105, name: "Green Tea", price: 100, img: "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg" },
    { id: 106, name: "Leo's Special", price: 300, img: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg" },
  ],
  "Burgers": [ 
    {id: 201, name: "Zinger Burger", price: 450, img: "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg"}, 
    {id: 202, name: "Beef Jalapeno", price: 650, img: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg"}, 
    {id: 203, name: "Club Burger", price: 400, img: "https://images.pexels.com/photos/2702674/pexels-photo-2702674.jpeg"}, 
    {id: 204, name: "Cheese Melt", price: 550, img: "https://images.pexels.com/photos/1556698/pexels-photo-1556698.jpeg"}, 
    {id: 205, name: "Double Patty", price: 800, img: "https://images.pexels.com/photos/1108117/pexels-photo-1108117.jpeg"}, 
    {id: 206, name: "Mini Slider", price: 300, img: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg"} 
  ],
  "Pizzas": [ 
    {id: 301, name: "Fajita Large", price: 1200, img: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg"}, 
    {id: 302, name: "Tikka Small", price: 600, img: "https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg"}, 
    {id: 303, name: "Crown Crust", price: 1500, img: "https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg"}, 
    {id: 304, name: "Veggie Lover", price: 900, img: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg"}, 
    {id: 305, name: "Margarita", price: 850, img: "https://images.pexels.com/photos/1166120/pexels-photo-1166120.jpeg"}, 
    {id: 306, name: "Deep Dish", price: 1800, img: "https://images.pexels.com/photos/1260968/pexels-photo-1260968.jpeg"} 
  ],
  "Steaks": [ 
    {id: 401, name: "Peppercorn Steak", price: 2200, img: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg"}, 
    {id: 402, name: "Mushroom Steak", price: 2400, img: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg"}, 
    {id: 403, name: "Beef Ribeye", price: 3000, img: "https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg"}, 
    {id: 404, name: "Chicken Steak", price: 1800, img: "https://images.pexels.com/photos/7613554/pexels-photo-7613554.jpeg"}, 
    {id: 405, name: "T-Bone", price: 3500, img: "https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg"}, 
    {id: 406, name: "Garlic Butter", price: 2100, img: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg"} 
  ],
  "Pastas": [ 
    {id: 501, name: "Alfredo Pasta", price: 950, img: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg"}, 
    {id: 502, name: "Penne Arabiata", price: 800, img: "https://images.pexels.com/photos/14737/pexels-photo.jpg"}, 
    {id: 503, name: "Lasagna Beef", price: 1200, img: "https://images.pexels.com/photos/1209029/pexels-photo-1209029.jpeg"}, 
    {id: 504, name: "Mac & Cheese", price: 700, img: "https://images.pexels.com/photos/5410414/pexels-photo-5410414.jpeg"}, 
    {id: 505, name: "Spaghetti", price: 850, img: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg"}, 
    {id: 506, name: "Ravioli", price: 1500, img: "https://images.pexels.com/photos/612252/pexels-photo-612252.jpeg"} 
  ],
  "Beverages": [ 
    {id: 601, name: "Cold Coffee", price: 450, img: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg"}, 
    {id: 602, name: "Mint Margarita", price: 300, img: "https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg"}, 
    {id: 603, name: "Blue Lagoon", price: 350, img: "https://images.pexels.com/photos/414630/pexels-photo-414630.jpeg"}, 
    {id: 604, name: "Piña Colada", price: 500, img: "https://images.pexels.com/photos/109275/pexels-photo-109275.jpeg"}, 
    {id: 605, name: "Hot Chocolate", price: 400, img: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg"}, 
    {id: 606, name: "Fresh Juice", price: 250, img: "https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg"} 
  ],
  "Desserts": [ 
    {id: 701, name: "Molten Lava", price: 850, img: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg"}, 
    {id: 702, name: "Cheesecake", price: 700, img: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg"}, 
    {id: 703, name: "Brownie Ice", price: 450, img: "https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg"}, 
    {id: 704, name: "Waffles", price: 600, img: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg"}, 
    {id: 705, name: "Apple Pie", price: 500, img: "https://images.pexels.com/photos/6163270/pexels-photo-6163270.jpeg"}, 
    {id: 706, name: "Tiramisu", price: 900, img: "https://images.pexels.com/photos/1209029/pexels-photo-1209029.jpeg"} 
  ]
};

const DEALS_DATA = [
  { id: 901, name: "Solo Pride Deal", price: 550, img: "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg", desc: "1 Zinger + 1 Soft Drink", tag: "BEST VALUE", color: '#FFD700' },
  { id: 902, name: "Twin Pizza Deal", price: 1100, img: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg", desc: "2 Small Pizzas + 500ml Drink", tag: "POPULAR", color: '#FFA500' },
  { id: 903, name: "Family Platter", price: 1800, img: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg", desc: "Full Chicken + Large Fries + 1.5L", tag: "FAMILY", color: '#FF4500' },
  { id: 904, name: "Steak Night", price: 4500, img: "https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg", desc: "2 Steaks + 2 Desserts + Mocktails", tag: "PREMIUM", color: '#D4AF37' },
  { id: 905, name: "Tea Party", price: 600, img: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg", desc: "4 Kashmiri Chais + Biscuits", tag: "EVENING", color: '#20B2AA' },
  { id: 906, name: "Pasta Feast", price: 1600, img: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg", desc: "2 Alfredo Pastas + Garlic Bread", tag: "HOT SELLER", color: '#FF6347' },
];

const SIGNATURE_MENU = [
  { id: 801, name: "Leo Lobster Tail", price: 4500, img: "https://images.pexels.com/photos/3338681/pexels-photo-3338681.jpeg" },
  { id: 802, name: "Truffle Ribeye", price: 5200, img: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg" }, 
  { id: 803, name: "Golden Leaf Chai", price: 1200, img: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg" },
  { id: 804, name: "Pride Platter", price: 3800, img: "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg" },
  { id: 805, name: "Wagyu Slider", price: 2100, img: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg" },
];

const MANAGEMENT_TABLES = [
  { id: 1, status: 'Reserved', remaining: '45m', expiry: '12:45 PM' },
  { id: 2, status: 'Available', remaining: '-', expiry: '-' },
  { id: 3, status: 'Reserved', remaining: '12m', expiry: '12:12 PM' },
  { id: 4, status: 'Available', remaining: '-', expiry: '-' },
  { id: 5, status: 'Reserved', remaining: '1h 20m', expiry: '01:20 PM' },
  { id: 6, status: 'Available', remaining: '-', expiry: '-' },
  { id: 7, status: 'Reserved', remaining: '5m', expiry: '12:05 PM' },
  { id: 8, status: 'Available', remaining: '-', expiry: '-' },
];

export default function App() {
  return (
    <SafeAreaProvider>
      <LeoHubCore />
    </SafeAreaProvider>
  );
}

function LeoHubCore() {
  const { width: windowWidth } = useWindowDimensions();
  const [screen, setScreen] = useState('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState("Brewed Teas");
  const [cart, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [search, setSearch] = useState('');
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [reservedTableInfo, setReservedTableInfo] = useState(null);
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [lastPaymentAmount, setLastPaymentAmount] = useState(0);

  // New state for Refund Data
  const [refundReason, setRefundReason] = useState('');
  const [refundAccount, setRefundAccount] = useState('');

  const isTablet = windowWidth > 768;
  const totalPayment = cart.reduce((sum, item) => sum + item.price, 0);

  const handleReserveTable = (tableId) => {
    const now = new Date();
    const expiryTime = new Date(now.getTime() + 2 * 60 * 60 * 1000); 
    
    setReservedTableInfo({
      id: tableId,
      date: now.toDateString(),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      expiry: expiryTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    setScreen('reservation_success');
  };

  const handleStartScanning = () => {
    setScreen('scanning_screen');
    setTimeout(() => {
      setScreen('qr_view');
    }, 2500);
  };

  const handleLogin = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setScreen('welcome');
    }, 1500);
  };

 const handleCompletePayment = async () => {
    if (selectedPaymentMethod !== 'Cash on Delivery') {
      if (!accountNumber || accountNumber.length < 10) {
        Alert.alert("Invalid", "Please enter a valid account number.");
        return;
      }
    }

    setIsProcessing(true);

    try {
      // Backend ko order bhej rahay hain
      const response = await fetch('http://192.168.0.113:8080/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name || "Yashfa",
          orderItems: cart,
          totalAmount: totalPayment,
          paymentMethod: selectedPaymentMethod
        }),
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      // Success logic
      setLastPaymentAmount(totalPayment);
      setIsProcessing(false);
      setCart([]);
      setScreen('payment_success_page');
    } catch (error) {
      setIsProcessing(false);
      console.error("Error:", error);
      Alert.alert("Error", "Backend server se rabta nahi ho saka!");
    }
  };
  const processRefundFinal = () => {
    if(!refundReason || !refundAccount) {
      Alert.alert("Missing Info", "Please provide a reason and account for the refund.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setScreen('refund_success_page');
    }, 2500);
  };

  const filteredCategoryItems = MENU_CATEGORIES[category]?.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  // --- SCREEN RENDERING ---

  if (screen === 'auth') {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.center}>
        <View style={styles.darkOverlay} />
        <View style={[styles.glassCard, { width: isTablet ? '50%' : '90%' }]}>
          <Text style={styles.brandTitle}>LEO'S HUB</Text>
          <Text style={{color: THEME.muted, marginBottom: 20, fontSize: 12}}>SIGN IN TO YOUR ACCOUNT</Text>
          <TextInput style={styles.satinInput} placeholder="Email Address" placeholderTextColor="#888" value={email} onChangeText={setEmail} autoCapitalize="none" />
          <TextInput style={styles.satinInput} placeholder="Password" placeholderTextColor="#888" secureTextEntry value={password} onChangeText={setPassword} />
          <TouchableOpacity style={{alignSelf: 'flex-end', marginBottom: 20}} onPress={() => Alert.alert("Reset", "Recovery link sent.")}><Text style={{color: THEME.accent, fontSize: 12}}>Forgot Password?</Text></TouchableOpacity>
          <TouchableOpacity style={styles.goldPulseBtn} onPress={handleLogin}>{isProcessing ? <ActivityIndicator color={THEME.primary} /> : <Text style={styles.btnText}>LOGIN</Text>}</TouchableOpacity>
          <View style={{flexDirection: 'row', marginTop: 25}}><Text style={{color: '#FFF', fontSize: 13}}>Don't have an account? </Text><TouchableOpacity onPress={() => setScreen('signup')}><Text style={{color: THEME.accent, fontWeight: 'bold'}}>Create One</Text></TouchableOpacity></View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  if (screen === 'signup') {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.center}>
        <View style={styles.darkOverlay} />
        <View style={[styles.glassCard, { width: isTablet ? '50%' : '90%' }]}>
          <TouchableOpacity style={{alignSelf: 'flex-start'}} onPress={() => setScreen('auth')}><MaterialCommunityIcons name="arrow-left" size={24} color={THEME.accent} /></TouchableOpacity>
          <Text style={styles.brandTitle}>JOIN THE PRIDE</Text>
          <TextInput style={styles.satinInput} placeholder="Full Name" placeholderTextColor="#888" value={name} onChangeText={setName} />
          <TextInput style={styles.satinInput} placeholder="Email" placeholderTextColor="#888" value={email} onChangeText={setEmail} />
          <TextInput style={styles.satinInput} placeholder="Password" placeholderTextColor="#888" secureTextEntry value={password} onChangeText={setPassword} />
          <TouchableOpacity style={styles.goldPulseBtn} onPress={() => setScreen('auth')}><Text style={styles.btnText}>CREATE ACCOUNT</Text></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  if (screen === 'welcome') {
    return (
      <View style={styles.center}>
        <Image source={{uri: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg'}} style={StyleSheet.absoluteFillObject} />
        <View style={styles.darkOverlay} />
        <Text style={[styles.brandTitle, { fontSize: isTablet ? 60 : 32 }]}>THE PRIDE</Text>
        <TouchableOpacity style={styles.outlineBtn} onPress={() => setScreen('menu')}><Text style={styles.outlineBtnText}>ENTER LOUNGE</Text></TouchableOpacity>
      </View>
    );
  }

  if (screen === 'menu') {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: THEME.primary}}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
            <View>
              <Text style={{color: THEME.muted, fontSize: 12}}>Welcome back,</Text>
              <Text style={{color: '#FFF', fontSize: 18, fontWeight: 'bold'}}>{name || "Lion"} 🦁</Text>
            </View>
            <TouchableOpacity onPress={() => setIsCartVisible(true)} style={styles.iconCircle}>
              <MaterialCommunityIcons name="shopping" size={22} color={THEME.accent} />
              {cart.length > 0 && <View style={styles.cartBadge}><Text style={styles.badgeText}>{cart.length}</Text></View>}
            </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.loyaltyCard}>
             <View style={{flex: 1}}>
                <Text style={{color: THEME.primary, fontWeight: 'bold', fontSize: 16}}>PRIDE LOYALTY</Text>
                <Text style={{color: THEME.primary, fontSize: 10, marginTop: 5}}>Tier: Gold Member</Text>
                <View style={styles.progressBar}><View style={{width: '70%', height: '100%', backgroundColor: THEME.primary, borderRadius: 5}} /></View>
                <Text style={{color: THEME.primary, fontSize: 9, marginTop: 4}}>240 points to next reward</Text>
             </View>
             <MaterialCommunityIcons name="crown" size={40} color={THEME.primary} />
          </View>

          <View style={[styles.searchContainer, { marginHorizontal: 20 }]}>
            <MaterialCommunityIcons name="magnify" size={20} color={THEME.muted} />
            <TextInput style={styles.searchInput} placeholder="Search our flavors..." placeholderTextColor="#666" value={search} onChangeText={setSearch} />
          </View>
        
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catSlider}>
            {Object.keys(MENU_CATEGORIES).map(cat => (
              <TouchableOpacity key={cat} onPress={() => setCategory(cat)} style={[styles.catCircle, category === cat && styles.catActive]}>
                <Text style={[styles.catLabel, category === cat && {color: THEME.primary}]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionItem} onPress={handleStartScanning}>
              <View style={styles.actionIcon}><MaterialCommunityIcons name="qrcode" size={20} color={THEME.accent}/></View>
              <Text style={styles.actionText}>Scan Table</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem} onPress={() => setScreen('feedback')}>
              <View style={styles.actionIcon}><MaterialCommunityIcons name="star" size={20} color={THEME.accent}/></View>
              <Text style={styles.actionText}>Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View style={styles.actionIcon}><MaterialCommunityIcons name="gift" size={20} color={THEME.accent}/></View>
              <Text style={styles.actionText}>Offers</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>{category.toUpperCase()}</Text>
          <View style={styles.menuGrid}>
            {filteredCategoryItems.map(item => (
              <View key={item.id} style={styles.foodCard}>
                <Image source={{uri: item.img}} style={styles.foodImg} />
                <View style={styles.cardInfo}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodPrice}>{item.price} PKR</Text>
                  <TouchableOpacity onPress={() => setCart([...cart, item])} style={styles.addBtn}>
                    <Text style={styles.addBtnText}>+ ADD TO CART</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>EXCLUSIVE DEALS</Text>
          <View style={{paddingHorizontal: 20}}>
            {DEALS_DATA.map(deal => (
              <TouchableOpacity key={deal.id} style={[styles.dealBanner, {borderLeftColor: deal.color}]} onPress={() => setCart([...cart, deal])}>
                <Image source={{uri: deal.img}} style={styles.dealBannerImg} />
                <View style={styles.dealContent}>
                  <Text style={styles.dealName}>{deal.name}</Text>
                  <Text style={styles.dealDesc}>{deal.desc}</Text>
                  <Text style={styles.dealPrice}>{deal.price} PKR</Text>
                </View>
                <MaterialCommunityIcons name="plus-circle" size={26} color={deal.color} style={{marginRight: 10}} />
              </TouchableOpacity>
            ))}
          </View>
          <View style={{height: 120}} />
        </ScrollView>

        {cart.length > 0 && (
          <TouchableOpacity style={styles.floatingCartBar} onPress={() => setIsCartVisible(true)}>
            <View><Text style={styles.cartBarItems}>{cart.length} ITEMS SELECTED</Text><Text style={styles.cartBarPrice}>{totalPayment} PKR</Text></View>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)', padding: 8, borderRadius: 10}}><Text style={styles.cartBarAction}>VIEW CART</Text><MaterialCommunityIcons name="chevron-right" size={20} color={THEME.primary} /></View>
          </TouchableOpacity>
        )}

        <Modal visible={isCartVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.cartContainer}>
              <View style={styles.cartHeaderModal}><Text style={styles.cartTitleModal}>Your Orders</Text><TouchableOpacity onPress={() => setIsCartVisible(false)}><MaterialCommunityIcons name="close-circle" size={28} color={THEME.accent} /></TouchableOpacity></View>
              <ScrollView>{cart.map((item, index) => (
                <View key={index} style={styles.cartItemRow}><Text style={{color: '#FFF', flex: 1}}>{item.name}</Text><Text style={{color: THEME.accent}}>{item.price} PKR</Text>
                <TouchableOpacity onPress={() => { let temp = [...cart]; temp.splice(index, 1); setCart(temp); }} style={{marginLeft: 15}}><MaterialCommunityIcons name="trash-can" size={20} color="#E74C3C" /></TouchableOpacity></View>
              ))}</ScrollView>
              <View style={styles.paymentBox}><Text style={styles.paymentLabel}>Total Payable</Text><Text style={styles.paymentValue}>{totalPayment} PKR</Text></View>
              <TouchableOpacity style={styles.goldPulseBtn} onPress={() => { setIsCartVisible(false); setScreen('payment_options'); }}>
                <Text style={styles.btnText}>PROCEED TO PAY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => setScreen('menu')} style={styles.navActiveItem}><MaterialCommunityIcons name="home" size={24} color={THEME.primary} /><Text style={{fontSize: 10, fontWeight: 'bold', color: THEME.primary}}>Home</Text></TouchableOpacity>
          <TouchableOpacity onPress={handleStartScanning}><MaterialCommunityIcons name="table-chair" size={24} color={THEME.muted} /></TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen('feedback')}><MaterialCommunityIcons name="heart-flash" size={24} color={THEME.muted} /></TouchableOpacity>
          <TouchableOpacity onPress={() => setScreen('auth')}><MaterialCommunityIcons name="logout" size={24} color={THEME.muted} /></TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'payment_options') {
    return (
      <SafeAreaView style={[styles.center, {backgroundColor: THEME.primary, padding: 20}]}>
         <View style={styles.glassCard}>
            <Text style={[styles.brandTitle, {fontSize: 22}]}>SELECT PAYMENT</Text>
            <Text style={{color: THEME.muted, marginBottom: 20}}>Amount to Pay: {totalPayment} PKR</Text>
            <TouchableOpacity style={styles.payOptionBtn} onPress={() => { setSelectedPaymentMethod('EasyPaisa'); setScreen('payment_details'); }}><MaterialCommunityIcons name="wallet" size={24} color="#2ECC71" /><Text style={styles.payOptionText}>EasyPaisa</Text></TouchableOpacity>
            <TouchableOpacity style={styles.payOptionBtn} onPress={() => { setSelectedPaymentMethod('JazzCash'); setScreen('payment_details'); }}><MaterialCommunityIcons name="cellphone-nfc" size={24} color="#F1C40F" /><Text style={styles.payOptionText}>JazzCash</Text></TouchableOpacity>
            <TouchableOpacity style={styles.payOptionBtn} onPress={() => { setSelectedPaymentMethod('Bank Transfer'); setScreen('payment_details'); }}><MaterialCommunityIcons name="bank" size={24} color="#3498DB" /><Text style={styles.payOptionText}>Bank Transfer</Text></TouchableOpacity>
            
            {/* CASH ON DELIVERY OPTION INSERTED HERE */}
            <TouchableOpacity style={styles.payOptionBtn} onPress={() => { setSelectedPaymentMethod('Cash on Delivery'); handleCompletePayment(); }}><MaterialCommunityIcons name="cash" size={24} color="#E67E22" /><Text style={styles.payOptionText}>Cash on Delivery</Text></TouchableOpacity>
            
            <TouchableOpacity style={{marginTop: 20}} onPress={() => setScreen('menu')}><Text style={{color: '#FFF'}}>Cancel</Text></TouchableOpacity>
         </View>
      </SafeAreaView>
    );
  }

  if (screen === 'payment_details') {
    return (
      <SafeAreaView style={[styles.center, {backgroundColor: THEME.primary, padding: 20}]}>
         <View style={styles.glassCard}>
            <MaterialCommunityIcons name="shield-check" size={50} color={THEME.accent} />
            <Text style={[styles.brandTitle, {fontSize: 20}]}>{selectedPaymentMethod?.toUpperCase()}</Text>
            <Text style={{color: '#FFF', marginBottom: 20}}>Enter your {selectedPaymentMethod} account number</Text>
            <TextInput style={styles.satinInput} placeholder="e.g 0300 1234567" placeholderTextColor="#888" keyboardType="numeric" value={accountNumber} onChangeText={setAccountNumber} />
            <TouchableOpacity style={styles.goldPulseBtn} onPress={handleCompletePayment} disabled={isProcessing}>{isProcessing ? <ActivityIndicator color={THEME.primary} /> : <Text style={styles.btnText}>TRANSFER {totalPayment} PKR</Text>}</TouchableOpacity>
            <TouchableOpacity style={{marginTop: 20}} onPress={() => setScreen('payment_options')}><Text style={{color: THEME.muted}}>Go Back</Text></TouchableOpacity>
         </View>
      </SafeAreaView>
    );
  }

  if (screen === 'payment_success_page') {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: THEME.primary}}>
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20}} showsVerticalScrollIndicator={false}>
            <View style={styles.glassCard}>
              <View style={styles.successIconCircle}><MaterialCommunityIcons name="check-all" size={60} color="#2ECC71" /></View>
              <Text style={[styles.brandTitle, {fontSize: 24, marginTop: 10}]}>SUCCESSFUL!</Text>
              <Text style={{color: '#FFF', fontSize: 16, marginBottom: 5}}>{selectedPaymentMethod === 'Cash on Delivery' ? 'Order Placed Successfully' : 'Payment Sent Successfully'}</Text>
              <View style={styles.ticketBox}>
                 <View style={styles.ticketRow}><Text style={styles.ticketLabel}>METHOD</Text><Text style={styles.ticketValue}>{selectedPaymentMethod}</Text></View>
                 <View style={styles.ticketRow}><Text style={styles.ticketLabel}>AMOUNT</Text><Text style={[styles.ticketValue, {color: THEME.accent}]}>{lastPaymentAmount} PKR</Text></View>
              </View>

              {/* NAVIGATE TO REFUND DATA ENTRY (Only show if not COD) */}
              {selectedPaymentMethod !== 'Cash on Delivery' && (
                <TouchableOpacity style={styles.refundBtn} onPress={() => setScreen('refund_data_entry')}>
                   <MaterialCommunityIcons name="undo-variant" size={16} color={THEME.accent} />
                   <Text style={styles.refundBtnText}>Made a mistake? Request Refund</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={[styles.goldPulseBtn, {marginTop: 20}]} onPress={() => { setAccountNumber(''); setSelectedPaymentMethod(null); setScreen('menu'); }}>
                <Text style={styles.btnText}>BACK TO HOME</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // --- NEW PROFESSIONAL REFUND DATA ENTRY SCREEN ---
  if (screen === 'refund_data_entry') {
    return (
        <SafeAreaView style={[styles.center, {backgroundColor: THEME.primary}]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{width: '100%', alignItems: 'center'}}>
                <View style={styles.glassCard}>
                    <TouchableOpacity style={{alignSelf: 'flex-start', marginBottom: 10}} onPress={() => setScreen('payment_success_page')}>
                        <MaterialCommunityIcons name="close" size={24} color={THEME.accent} />
                    </TouchableOpacity>
                    
                    <MaterialCommunityIcons name="alert-circle-outline" size={50} color={THEME.accent} />
                    <Text style={[styles.brandTitle, {fontSize: 22, marginVertical: 10}]}>REFUND REQUEST</Text>
                    <Text style={{color: THEME.muted, textAlign: 'center', marginBottom: 20, fontSize: 13}}>
                        Please provide valid details to reverse your payment of {lastPaymentAmount} PKR.
                    </Text>

                    <Text style={styles.inputLabel}>Reason for Refund</Text>
                    <TextInput 
                        style={[styles.satinInput, {height: 80, textAlignVertical: 'top'}]} 
                        placeholder="e.g. Accidental duplicate transfer" 
                        placeholderTextColor="#666" 
                        multiline 
                        value={refundReason}
                        onChangeText={setRefundReason}
                    />

                    <Text style={styles.inputLabel}>Receiver Account Number</Text>
                    <TextInput 
                        style={styles.satinInput} 
                        placeholder="Enter your account number" 
                        placeholderTextColor="#666" 
                        keyboardType="numeric"
                        value={refundAccount}
                        onChangeText={setRefundAccount}
                    />

                    <TouchableOpacity 
                        style={[styles.goldPulseBtn, {backgroundColor: '#E74C3C', marginTop: 10}]} 
                        onPress={processRefundFinal}
                        disabled={isProcessing}
                    >
                        {isProcessing ? <ActivityIndicator color="#FFF" /> : <Text style={[styles.btnText, {color: '#FFF'}]}>CONFIRM & REFUND</Text>}
                    </TouchableOpacity>
                    
                    <Text style={{color: THEME.muted, fontSize: 10, marginTop: 15, fontStyle: 'italic'}}>
                        *Verification process may take up to 24 hours.
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
  }

  if (screen === 'refund_success_page') {
    return (
      <SafeAreaView style={[styles.center, {backgroundColor: THEME.primary, padding: 20}]}>
         <View style={styles.glassCard}>
            <View style={[styles.successIconCircle, {backgroundColor: 'rgba(231, 76, 60, 0.1)'}]}>
              <MaterialCommunityIcons name="cash-refund" size={60} color="#E74C3C" />
            </View>
            <Text style={[styles.brandTitle, {fontSize: 24, marginTop: 15, color: '#E74C3C'}]}>REFUNDED!</Text>
            <Text style={{color: '#FFF', fontSize: 16, textAlign: 'center', marginBottom: 20}}>Your payment of {lastPaymentAmount} PKR has been successfully reversed.</Text>
            
            <View style={[styles.ticketBox, {borderColor: '#E74C3C'}]}>
               <View style={styles.ticketRow}><Text style={styles.ticketLabel}>REFUND STATUS</Text><Text style={[styles.ticketValue, {color: '#2ECC71'}]}>COMPLETED</Text></View>
               <View style={styles.ticketRow}><Text style={styles.ticketLabel}>RECIPIENT</Text><Text style={styles.ticketValue}>{refundAccount || accountNumber}</Text></View>
               <View style={[styles.ticketRow, {borderBottomWidth: 0}]}><Text style={styles.ticketLabel}>TXN TYPE</Text><Text style={styles.ticketValue}>REVERSAL</Text></View>
            </View>

            <Text style={{color: THEME.muted, fontSize: 10, textAlign: 'center', marginTop: 15}}>Note: It may take 5-10 minutes to reflect in your wallet account.</Text>

            <TouchableOpacity style={[styles.goldPulseBtn, {marginTop: 30}]} onPress={() => { setAccountNumber(''); setRefundAccount(''); setRefundReason(''); setScreen('menu'); }}>
              <Text style={styles.btnText}>BACK TO HOME</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
    );
  }

  // Other screens stay as they were...
  if (screen === 'scanning_screen') { return <View style={[styles.center, {backgroundColor: '#000'}]}><View style={styles.scannerBox}><MaterialCommunityIcons name="qrcode-scan" size={100} color={THEME.accent} /><View style={styles.scanLine} /></View><Text style={styles.scanningText}>SCANNING TABLE QR...</Text><ActivityIndicator size="large" color={THEME.accent} style={{marginTop: 30}} /></View>; }
  if (screen === 'qr_view') { return <SafeAreaView style={{flex:1, backgroundColor: THEME.primary, padding: 20}}><View style={styles.header}><TouchableOpacity onPress={() => setScreen('menu')}><MaterialCommunityIcons name="chevron-left" size={30} color={THEME.accent} /></TouchableOpacity><Text style={styles.headerTitle}>TABLE MANAGEMENT</Text><View style={{width: 30}} /></View><ScrollView contentContainerStyle={styles.tableGrid}>{MANAGEMENT_TABLES.map((table) => (<View key={table.id} style={styles.mgmtCard}><View style={styles.mgmtHeader}><Text style={styles.mgmtTableNum}>Table #{table.id}</Text><View style={[styles.statusBadge, {backgroundColor: table.status === 'Available' ? '#2ECC71' : '#E74C3C'}]} /></View><Text style={[styles.mgmtStatusText, {color: table.status === 'Available' ? '#2ECC71' : '#E74C3C'}]}>{table.status}</Text>{table.status === 'Available' ? (<TouchableOpacity style={styles.reserveBtnSmall} onPress={() => handleReserveTable(table.id)}><Text style={styles.reserveBtnText}>RESERVE</Text></TouchableOpacity>) : ( <Text style={styles.mgmtDetailText}>Expiry: {table.expiry}</Text> )}</View>))}</ScrollView></SafeAreaView>; }
  if (screen === 'reservation_success' && reservedTableInfo) { return <SafeAreaView style={[styles.center, {backgroundColor: THEME.primary, padding: 20}]}><ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center', flexGrow: 1}} showsVerticalScrollIndicator={false}><View style={styles.glassCard}><MaterialCommunityIcons name="calendar-check" size={60} color="#2ECC71" /><Text style={[styles.brandTitle, {fontSize: 22, marginVertical: 10}]}>RESERVATION CONFIRMED</Text><View style={styles.ticketBox}><View style={styles.ticketRow}><Text style={styles.ticketLabel}>TABLE NUMBER</Text><Text style={styles.ticketValue}>#{reservedTableInfo.id}</Text></View><View style={styles.ticketRow}><Text style={styles.ticketLabel}>BOOKING DATE</Text><Text style={styles.ticketValue}>{reservedTableInfo.date}</Text></View><View style={styles.ticketRow}><Text style={styles.ticketLabel}>ARRIVAL TIME</Text><Text style={styles.ticketValue}>{reservedTableInfo.time}</Text></View><View style={[styles.ticketRow, {borderBottomWidth: 0}]}><Text style={styles.ticketLabel}>VALID UNTIL</Text><Text style={[styles.ticketValue, {color: '#E74C3C'}]}>{reservedTableInfo.expiry}</Text></View></View><Text style={[styles.expiryWarning, {marginBottom: 10}]}>*Your reservation is valid for 2 hours.</Text><TouchableOpacity style={[styles.goldPulseBtn, { marginTop: 20, height: 50, justifyContent: 'center' }]} onPress={() => setScreen('menu')}><Text style={[styles.btnText, {fontSize: 16}]}>BACK TO MENU</Text></TouchableOpacity></View></ScrollView></SafeAreaView>; }
  if (screen === 'feedback') { return <SafeAreaView style={{flex:1, backgroundColor: THEME.primary, padding: 25}}><TouchableOpacity onPress={() => setScreen('menu')}><MaterialCommunityIcons name="chevron-left" size={30} color={THEME.accent} /></TouchableOpacity><View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><MaterialCommunityIcons name="heart-outline" size={80} color={THEME.accent} /><Text style={{color: '#FFF', fontSize: 24, fontWeight: 'bold', marginTop: 20}}>FEEDBACK</Text><TextInput style={[styles.satinInput, {height: 120, marginTop: 20}]} placeholder="Message" placeholderTextColor="#666" multiline /><TouchableOpacity style={styles.goldPulseBtn} onPress={() => setScreen('feedback_success')}><Text style={styles.btnText}>SUBMIT</Text></TouchableOpacity></View></SafeAreaView>; }
  if (screen === 'feedback_success') { return <SafeAreaView style={[styles.center, {backgroundColor: THEME.primary, padding: 20}]}><View style={styles.glassCard}><MaterialCommunityIcons name="email-check-outline" size={80} color="#2ECC71" /><Text style={[styles.brandTitle, {fontSize: 22, marginTop: 20}]}>FEEDBACK SENT!</Text><Text style={{color: '#FFF', textAlign: 'center', marginBottom: 25, lineHeight: 22}}>Your valuable feedback has been successfully sent to the Manager. Thank you for helping us improve!</Text><TouchableOpacity style={styles.goldPulseBtn} onPress={() => setScreen('menu')}><Text style={styles.btnText}>BACK TO HOME</Text></TouchableOpacity></View></SafeAreaView>; }

  return null;
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1A060A' },
  darkOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.7)' },
  glassCard: { padding: 25, borderRadius: 20, backgroundColor: THEME.glass, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', width: '90%' },
  brandTitle: { color: THEME.accent, fontWeight: 'bold', letterSpacing: 4, marginVertical: 20, textAlign: 'center', fontSize: 28 },
  satinInput: { width: '100%', padding: 15, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.08)', color: '#FFF', marginBottom: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  inputLabel: { alignSelf: 'flex-start', color: THEME.accent, fontSize: 12, marginBottom: 5, fontWeight: '600' },
  goldPulseBtn: { backgroundColor: THEME.accent, padding: 18, borderRadius: 10, alignItems: 'center', width: '100%' },
  btnText: { color: THEME.primary, fontWeight: 'bold' },
  header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  iconCircle: { width: 45, height: 45, borderRadius: 23, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  loyaltyCard: { marginHorizontal: 20, backgroundColor: THEME.accent, borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  progressBar: { width: '100%', height: 6, backgroundColor: 'rgba(45, 11, 18, 0.2)', borderRadius: 5, marginTop: 10 },
  quickActions: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10, paddingHorizontal: 10 },
  actionItem: { alignItems: 'center' },
  actionIcon: { width: 45, height: 45, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  actionText: { color: THEME.muted, fontSize: 10 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', marginVertical: 20, paddingHorizontal: 15, borderRadius: 12, height: 50 },
  searchInput: { flex: 1, color: '#FFF', marginLeft: 10 },
  catSlider: { paddingLeft: 20, marginBottom: 10 },
  catCircle: { paddingHorizontal: 20, height: 40, borderRadius: 25, borderWidth: 1, borderColor: THEME.accent, justifyContent: 'center', marginRight: 10 },
  catActive: { backgroundColor: THEME.accent },
  catLabel: { color: THEME.accent, fontSize: 11, fontWeight: 'bold' },
  sectionTitle: { color: THEME.accent, paddingLeft: 20, fontSize: 18, fontWeight: 'bold', marginTop: 25, marginBottom: 15 },
  menuGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  foodCard: { width: '48%', backgroundColor: '#3D141C', borderRadius: 18, marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  foodImg: { width: '100%', height: 110 },
  cardInfo: { padding: 12 },
  foodName: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },
  foodPrice: { color: THEME.accent, fontSize: 12, marginVertical: 4 },
  addBtn: { marginTop: 8, backgroundColor: 'rgba(255,255,255,0.05)', paddingVertical: 6, borderRadius: 8 },
  addBtnText: { color: THEME.accent, fontSize: 9, textAlign: 'center', fontWeight: 'bold' },
  dealBanner: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: 15, borderRadius: 15, overflow: 'hidden', borderLeftWidth: 5, alignItems: 'center' },
  dealBannerImg: { width: 90, height: 90 },
  dealContent: { flex: 1, padding: 12 },
  dealName: { color: '#FFF', fontWeight: 'bold' },
  dealDesc: { color: THEME.muted, fontSize: 10 },
  dealPrice: { color: THEME.accent, fontWeight: 'bold' },
  bottomNav: { position: 'absolute', bottom: 20, alignSelf: 'center', width: '90%', height: 65, backgroundColor: '#1A060A', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 30, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 10 },
  navActiveItem: { backgroundColor: THEME.accent, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, flexDirection: 'row', alignItems: 'center' },
  outlineBtn: { borderWidth: 1, borderColor: THEME.accent, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
  outlineBtnText: { color: THEME.accent, letterSpacing: 2, fontWeight: 'bold' },
  scannerBox: { padding: 40, borderWidth: 2, borderColor: THEME.accent, borderRadius: 20, overflow: 'hidden' },
  scanLine: { position: 'absolute', width: '100%', height: 3, backgroundColor: THEME.accent, top: '50%' },
  scanningText: { color: THEME.accent, marginTop: 25, fontSize: 18, fontWeight: 'bold' },
  tableGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 20 },
  mgmtCard: { width: '48%', backgroundColor: '#3D141C', padding: 15, borderRadius: 15, marginBottom: 15 },
  mgmtHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  mgmtTableNum: { color: '#FFF', fontWeight: 'bold' },
  statusBadge: { width: 8, height: 8, borderRadius: 4 },
  mgmtStatusText: { fontSize: 12, fontWeight: 'bold', marginVertical: 5 },
  mgmtDetailText: { color: THEME.muted, fontSize: 10 },
  reserveBtnSmall: { backgroundColor: THEME.accent, padding: 8, borderRadius: 8, marginTop: 5, alignItems: 'center' },
  reserveBtnText: { color: THEME.primary, fontSize: 10, fontWeight: 'bold' },
  cartBadge: { position: 'absolute', right: -5, top: -5, backgroundColor: '#E74C3C', borderRadius: 10, width: 18, height: 18, justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  floatingCartBar: { position: 'absolute', bottom: 100, left: 20, right: 20, backgroundColor: THEME.accent, borderRadius: 20, padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 15 },
  cartBarItems: { color: THEME.primary, fontSize: 10, fontWeight: 'bold', opacity: 0.7 },
  cartBarPrice: { color: THEME.primary, fontSize: 16, fontWeight: 'bold' },
  cartBarAction: { color: THEME.primary, fontWeight: 'bold', fontSize: 12, marginRight: 5 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  cartContainer: { backgroundColor: THEME.primary, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, maxHeight: '80%' },
  cartHeaderModal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  cartTitleModal: { color: THEME.accent, fontSize: 22, fontWeight: 'bold' },
  cartItemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  paymentBox: { marginTop: 20, paddingVertical: 20, borderTopWidth: 1, borderTopColor: THEME.accent, flexDirection: 'row', justifyContent: 'space-between' },
  paymentLabel: { color: '#FFF', fontSize: 16 },
  paymentValue: { color: THEME.accent, fontSize: 20, fontWeight: 'bold' },
  ticketBox: { backgroundColor: 'rgba(255,255,255,0.05)', width: '100%', borderRadius: 15, padding: 20, marginVertical: 10, borderStyle: 'dashed', borderWidth: 1, borderColor: THEME.accent },
  ticketRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: 'rgba(243, 229, 171, 0.2)' },
  ticketLabel: { color: THEME.muted, fontSize: 10, fontWeight: 'bold' },
  ticketValue: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  expiryWarning: { color: THEME.muted, fontSize: 11, textAlign: 'center', marginTop: 15, lineHeight: 18, fontStyle: 'italic' },
  payOptionBtn: { width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', padding: 15, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  payOptionText: { color: '#FFF', fontSize: 16, fontWeight: '600', marginLeft: 15 },
  successIconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(46, 204, 113, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  refundBtn: { marginTop: 15, padding: 10, flexDirection: 'row', alignItems: 'center' },
  refundBtnText: { color: THEME.accent, fontSize: 12, textDecorationLine: 'underline', marginLeft: 5 },
});