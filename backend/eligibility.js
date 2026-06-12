'use strict';

const { SCHEMES } = require('./schemes');

/**
 * ELIGIBILITY_QUESTIONS — Ordered array of profile-gathering questions shown to users.
 * Each question object includes English, Hindi, and Tamil translations plus typed options.
 */
const ELIGIBILITY_QUESTIONS = [
  {
    id: 'occupation',
    questionEn: 'What is your primary occupation?',
    questionHi: 'आपका मुख्य व्यवसाय क्या है?',
    questionTa: 'உங்கள் முதன்மை தொழில் என்ன?',
    options: [
      { value: 'farmer',          labelEn: 'Farmer / Agricultural Worker',  labelHi: 'किसान / कृषि मजदूर',         labelTa: 'விவசாயி / வேளாண் தொழிலாளர்' },
      { value: 'gig_worker',      labelEn: 'Gig / Daily Wage Worker',        labelHi: 'गिग / दैनिक मजदूर',          labelTa: 'கிக் / தினசரி கூலி தொழிலாளர்' },
      { value: 'street_vendor',   labelEn: 'Street Vendor / Hawker',         labelHi: 'स्ट्रीट वेंडर / फेरीवाला',   labelTa: 'தெரு வியாபாரி / பெரிவாலா' },
      { value: 'unemployed',      labelEn: 'Unemployed / Job Seeker',        labelHi: 'बेरोजगार / नौकरी तलाशने वाला', labelTa: 'வேலையற்றவர் / வேலை தேடுபவர்' },
      { value: 'pregnant_mother', labelEn: 'Pregnant / Lactating Mother',   labelHi: 'गर्भवती / स्तनपान कराने वाली माँ', labelTa: 'கர்ப்பிணி / தாய்ப்பால் கொடுக்கும் தாய்' }
    ]
  },
  {
    id: 'annualIncome',
    questionEn: 'What is your approximate annual household income?',
    questionHi: 'आपकी अनुमानित वार्षिक घरेलू आय कितनी है?',
    questionTa: 'உங்கள் தோராயமான வருடாந்திர குடும்ப வருமானம் என்ன?',
    options: [
      { value: 50000,  labelEn: 'Below ₹50,000',           labelHi: '₹50,000 से कम',         labelTa: '₹50,000 க்கும் குறைவு' },
      { value: 100000, labelEn: '₹50,000 – ₹1,00,000',     labelHi: '₹50,000 – ₹1,00,000',   labelTa: '₹50,000 – ₹1,00,000' },
      { value: 200000, labelEn: '₹1,00,000 – ₹2,00,000',   labelHi: '₹1,00,000 – ₹2,00,000', labelTa: '₹1,00,000 – ₹2,00,000' },
      { value: 500000, labelEn: '₹2,00,000 – ₹5,00,000',   labelHi: '₹2,00,000 – ₹5,00,000', labelTa: '₹2,00,000 – ₹5,00,000' },
      { value: 999999, labelEn: 'Above ₹5,00,000',          labelHi: '₹5,00,000 से अधिक',     labelTa: '₹5,00,000 க்கும் மேல்' }
    ]
  },
  {
    id: 'gender',
    questionEn: 'What is your gender?',
    questionHi: 'आपका लिंग क्या है?',
    questionTa: 'உங்கள் பாலினம் என்ன?',
    options: [
      { value: 'male',   labelEn: 'Male',   labelHi: 'पुरुष', labelTa: 'ஆண்' },
      { value: 'female', labelEn: 'Female', labelHi: 'महिला', labelTa: 'பெண்' },
      { value: 'other',  labelEn: 'Other',  labelHi: 'अन्य',  labelTa: 'மற்றவர்கள்' }
    ]
  },
  {
    id: 'hasBankAccount',
    questionEn: 'Do you have a bank account?',
    questionHi: 'क्या आपके पास बैंक खाता है?',
    questionTa: 'உங்களுக்கு வங்கி கணக்கு இருக்கிறதா?',
    options: [
      { value: true,  labelEn: 'Yes, I have a bank account',    labelHi: 'हाँ, मेरे पास बैंक खाता है',  labelTa: 'ஆம், என்னிடம் வங்கி கணக்கு உள்ளது' },
      { value: false, labelEn: 'No, I do not have a bank account', labelHi: 'नहीं, मेरे पास बैंक खाता नहीं है', labelTa: 'இல்லை, என்னிடம் வங்கி கணக்கு இல்லை' }
    ]
  },
  {
    id: 'hasLand',
    questionEn: 'Do you own agricultural land? (Less than 2 hectares?)',
    questionHi: 'क्या आपके पास कृषि भूमि है? (2 हेक्टेयर से कम?)',
    questionTa: 'உங்களிடம் விவசாய நிலம் உள்ளதா? (2 ஹெக்டேருக்கும் குறைவு?)',
    // Only shown when occupation = 'farmer'
    showWhen: { field: 'occupation', value: 'farmer' },
    options: [
      { value: true,  labelEn: 'Yes, I own less than 2 hectares', labelHi: 'हाँ, मेरे पास 2 हेक्टेयर से कम है', labelTa: 'ஆம், என்னிடம் 2 ஹெக்டேருக்கும் குறைவான நிலம் உள்ளது' },
      { value: false, labelEn: 'No land / More than 2 hectares',  labelHi: 'कोई भूमि नहीं / 2 हेक्टेयर से अधिक', labelTa: 'நிலம் இல்லை / 2 ஹெக்டேருக்கும் அதிகம்' }
    ]
  },
  {
    id: 'hasLPG',
    questionEn: 'Do you already have an LPG gas connection at home?',
    questionHi: 'क्या आपके घर में पहले से LPG गैस कनेक्शन है?',
    questionTa: 'உங்கள் வீட்டில் ஏற்கனவே LPG கேஸ் இணைப்பு உள்ளதா?',
    // Only shown when gender = 'female'
    showWhen: { field: 'gender', value: 'female' },
    options: [
      { value: true,  labelEn: 'Yes, I have an LPG connection', labelHi: 'हाँ, मेरे पास LPG कनेक्शन है', labelTa: 'ஆம், என்னிடம் LPG இணைப்பு உள்ளது' },
      { value: false, labelEn: 'No LPG connection at home',     labelHi: 'घर में LPG कनेक्शन नहीं है',   labelTa: 'வீட்டில் LPG இணைப்பு இல்லை' }
    ]
  },
  {
    id: 'hasDaughter',
    questionEn: 'Do you have a daughter under 10 years of age?',
    questionHi: 'क्या आपकी 10 वर्ष से कम उम्र की बेटी है?',
    questionTa: 'உங்களுக்கு 10 வயதுக்கு குறைவான மகள் இருக்கிறாளா?',
    options: [
      { value: true,  labelEn: 'Yes',  labelHi: 'हाँ',  labelTa: 'ஆம்' },
      { value: false, labelEn: 'No',   labelHi: 'नहीं', labelTa: 'இல்லை' }
    ]
  }
];

/**
 * getEligibleSchemes — Determine which schemes a user qualifies for based on their profile.
 *
 * @param {Object} userProfile
 * @param {string} userProfile.occupation  - 'farmer' | 'gig_worker' | 'street_vendor' | 'unemployed' | 'pregnant_mother'
 * @param {number} userProfile.annualIncome - Annual household income in INR
 * @param {string} userProfile.gender       - 'male' | 'female' | 'other'
 * @param {boolean} userProfile.hasBankAccount
 * @param {boolean} userProfile.hasLand     - Owns <2 hectares of cultivable land
 * @param {boolean} userProfile.hasLPG      - Already has LPG connection
 * @param {boolean} userProfile.hasDaughter - Has a daughter under 10
 * @returns {Array} Array of matching scheme objects from SCHEMES
 */
function getEligibleSchemes(userProfile) {
  if (!userProfile || typeof userProfile !== 'object') {
    return [];
  }

  const {
    occupation,
    annualIncome = 0,
    gender,
    hasBankAccount = false,
    hasLand = false,
    hasLPG = true,
    hasDaughter = false
  } = userProfile;

  const isBPL = annualIncome < 120000; // Below ₹1.2 lakh/year as proxy for BPL
  const isLowIncome = annualIncome < 300000; // Below ₹3 lakh as "low income"
  const isFemale = gender === 'female';
  const isRural = ['farmer', 'gig_worker', 'unemployed'].includes(occupation);

  const eligible = [];

  // 1. PM-KISAN — farmer with <2 hectares land
  if (occupation === 'farmer' && hasLand) {
    eligible.push(findScheme('pm-kisan'));
  }

  // 2. Ayushman Bharat PMJAY — bottom 40% (~income below ₹2.5L and BPL criteria)
  if (isBPL || (isLowIncome && (isBPL || isRural))) {
    eligible.push(findScheme('ayushman-bharat'));
  }

  // 3. PMAY-G — homeless/kutcha housing, rural, low income
  if (isRural && isBPL) {
    eligible.push(findScheme('pmay-g'));
  }

  // 4. Ujjwala Yojana — female, BPL/low-income, no existing LPG
  if (isFemale && (isBPL || isLowIncome) && !hasLPG) {
    eligible.push(findScheme('ujjwala-yojana'));
  }

  // 5. MGNREGS — any rural adult; farmer, gig_worker, or unemployed in rural area
  if (isRural || occupation === 'gig_worker') {
    eligible.push(findScheme('mgnregs'));
  }

  // 6. Sukanya Samriddhi — has a daughter under 10 (any income, any gender as guardian)
  if (hasDaughter) {
    eligible.push(findScheme('sukanya-samriddhi'));
  }

  // 7. PM Matru Vandana — pregnant or lactating mother (first child)
  if (occupation === 'pregnant_mother' && isFemale) {
    eligible.push(findScheme('pm-matru-vandana'));
  }

  // 8. PM SVANidhi — street vendor
  if (occupation === 'street_vendor') {
    eligible.push(findScheme('pm-svanidhi'));
  }

  // 9. PMKVY — unemployed, gig worker, or young farmer who needs skills (broad eligibility)
  if (['unemployed', 'gig_worker', 'farmer', 'street_vendor'].includes(occupation)) {
    eligible.push(findScheme('pmkvy'));
  }

  // 10. PM Jan Dhan — unbanked individuals
  if (!hasBankAccount) {
    eligible.push(findScheme('jan-dhan'));
  }

  // Filter out any nulls (shouldn't happen, but defensive) and deduplicate by id
  return eligible
    .filter(Boolean)
    .filter((scheme, index, self) => self.findIndex(s => s.id === scheme.id) === index);
}

/**
 * Helper to find a scheme by id without crashing if not found.
 * @param {string} id
 * @returns {Object|null}
 */
function findScheme(id) {
  return SCHEMES.find(s => s.id === id) || null;
}

module.exports = { getEligibleSchemes, ELIGIBILITY_QUESTIONS };
