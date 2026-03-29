export const medicineDatabase = [
  { name: "Paracetamol", category: "Pain Reliever / Antipyretic", aliases: ["Acetaminophen", "Tylenol", "Crocin", "Dolo"] },
  { name: "Ibuprofen", category: "NSAID", aliases: ["Brufen", "Advil", "Motrin"] },
  { name: "Aspirin", category: "NSAID / Blood Thinner", aliases: ["Ecosprin", "Disprin"] },
  { name: "Amoxicillin", category: "Antibiotic", aliases: ["Amoxil", "Mox"] },
  { name: "Azithromycin", category: "Antibiotic", aliases: ["Zithromax", "Azee"] },
  { name: "Metformin", category: "Diabetes", aliases: ["Glucophage", "Glycomet"] },
  { name: "Atorvastatin", category: "Cholesterol", aliases: ["Lipitor", "Atorva"] },
  { name: "Omeprazole", category: "Antacid / PPI", aliases: ["Prilosec", "Omez"] },
  { name: "Pantoprazole", category: "Antacid / PPI", aliases: ["Pantocid", "Pan"] },
  { name: "Cetirizine", category: "Antihistamine", aliases: ["Zyrtec", "Cetzine"] },
  { name: "Montelukast", category: "Anti-Allergy", aliases: ["Singulair", "Montair"] },
  { name: "Amlodipine", category: "Blood Pressure", aliases: ["Norvasc", "Amlong"] },
  { name: "Losartan", category: "Blood Pressure", aliases: ["Cozaar", "Losacar"] },
  { name: "Metoprolol", category: "Beta Blocker", aliases: ["Lopressor", "Betaloc"] },
  { name: "Warfarin", category: "Blood Thinner", aliases: ["Coumadin", "Warf"] },
  { name: "Clopidogrel", category: "Blood Thinner", aliases: ["Plavix", "Clopilet"] },
  { name: "Diazepam", category: "Benzodiazepine", aliases: ["Valium", "Calmpose"] },
  { name: "Alprazolam", category: "Benzodiazepine", aliases: ["Xanax", "Alprax"] },
  { name: "Sertraline", category: "Antidepressant", aliases: ["Zoloft", "Serta"] },
  { name: "Fluoxetine", category: "Antidepressant", aliases: ["Prozac", "Fludac"] },
  { name: "Levothyroxine", category: "Thyroid", aliases: ["Synthroid", "Thyronorm", "Eltroxin"] },
  { name: "Prednisolone", category: "Corticosteroid", aliases: ["Wysolone", "Omnacortil"] },
  { name: "Insulin", category: "Diabetes", aliases: ["Humulin", "Lantus", "Novorapid"] },
  { name: "Diclofenac", category: "NSAID", aliases: ["Voveran", "Voltaren"] },
  { name: "Tramadol", category: "Opioid Pain Reliever", aliases: ["Ultram", "Domadol"] },
  { name: "Ciprofloxacin", category: "Antibiotic", aliases: ["Cipro", "Ciplox"] },
  { name: "Doxycycline", category: "Antibiotic", aliases: ["Vibramycin", "Doxy"] },
  { name: "Ranitidine", category: "H2 Blocker", aliases: ["Zantac", "Rantac"] },
  { name: "Salbutamol", category: "Bronchodilator", aliases: ["Ventolin", "Asthalin"] },
  { name: "Gabapentin", category: "Nerve Pain", aliases: ["Neurontin", "Gabapin"] },
  { name: "Lithium", category: "Mood Stabilizer", aliases: ["Eskalith", "Licab"] },
  { name: "Sildenafil", category: "PDE5 Inhibitor", aliases: ["Viagra", "Vigora"] },
  { name: "Tamsulosin", category: "Alpha Blocker", aliases: ["Flomax", "Urimax"] },
  { name: "Digoxin", category: "Cardiac Glycoside", aliases: ["Lanoxin", "Digox"] },
  { name: "Phenytoin", category: "Anticonvulsant", aliases: ["Dilantin", "Eptoin"] },
  { name: "Carbamazepine", category: "Anticonvulsant", aliases: ["Tegretol", "Zen Retard"] },
];

export const interactions = [
  {
    drugs: ["Warfarin", "Aspirin"],
    severity: "high",
    warning: "DANGEROUS — High risk of life-threatening bleeding. Both drugs thin blood. Combined use significantly increases chances of hemorrhage, internal bleeding, and stroke complications.",
    advice: "Contact your doctor IMMEDIATELY. Do not take together without explicit medical supervision."
  },
  {
    drugs: ["Warfarin", "Ibuprofen"],
    severity: "high",
    warning: "DANGEROUS — NSAIDs increase bleeding risk with Warfarin. Ibuprofen also irritates stomach lining, greatly increasing risk of gastrointestinal bleeding.",
    advice: "Avoid this combination. Use Paracetamol for pain instead. Consult your doctor."
  },
  {
    drugs: ["Metformin", "Alcohol"],
    severity: "high",
    warning: "DANGEROUS — Risk of lactic acidosis, a rare but potentially fatal condition. Alcohol also affects blood sugar levels unpredictably.",
    advice: "Avoid alcohol while taking Metformin. If you drink, limit strictly and monitor blood sugar."
  },
  {
    drugs: ["Aspirin", "Ibuprofen"],
    severity: "medium",
    warning: "CAUTION — Taking together reduces Aspirin's blood-thinning benefit and increases stomach bleeding risk. Both are NSAIDs and stress the stomach.",
    advice: "Take Ibuprofen at least 30 minutes after or 8 hours before Aspirin. Better to use Paracetamol instead."
  },
  {
    drugs: ["Aspirin", "Clopidogrel"],
    severity: "medium",
    warning: "CAUTION — Dual antiplatelet therapy increases bleeding risk. However, this combination is sometimes prescribed intentionally after cardiac events.",
    advice: "Only take together if specifically prescribed by your cardiologist. Report any unusual bleeding."
  },
  {
    drugs: ["Diazepam", "Alprazolam"],
    severity: "high",
    warning: "DANGEROUS — Both are benzodiazepines. Combined use can cause extreme sedation, respiratory depression, coma, and death.",
    advice: "NEVER take two benzodiazepines together. Contact your prescribing doctor immediately."
  },
  {
    drugs: ["Sertraline", "Tramadol"],
    severity: "high",
    warning: "DANGEROUS — Risk of Serotonin Syndrome (potentially fatal). Both drugs increase serotonin levels. Symptoms include agitation, rapid heartbeat, and high temperature.",
    advice: "Avoid this combination. Tell your doctor about all medications you're taking."
  },
  {
    drugs: ["Fluoxetine", "Tramadol"],
    severity: "high",
    warning: "DANGEROUS — Risk of Serotonin Syndrome. This combination can cause seizures, extremely high body temperature, and irregular heartbeat.",
    advice: "Do not take together. Seek alternative pain management. Consult your psychiatrist."
  },
  {
    drugs: ["Omeprazole", "Clopidogrel"],
    severity: "medium",
    warning: "CAUTION — Omeprazole reduces the effectiveness of Clopidogrel. This can increase risk of blood clots and cardiac events.",
    advice: "Use Pantoprazole instead of Omeprazole. Discuss with your doctor."
  },
  {
    drugs: ["Metoprolol", "Amlodipine"],
    severity: "low",
    warning: "MONITOR — Both lower blood pressure. Combined use may cause excessive drop in BP, dizziness, and fainting.",
    advice: "Monitor blood pressure regularly. Report dizziness or lightheadedness to your doctor."
  },
  {
    drugs: ["Lithium", "Ibuprofen"],
    severity: "high",
    warning: "DANGEROUS — Ibuprofen reduces kidney excretion of Lithium, causing Lithium toxicity. Symptoms include tremors, nausea, confusion, and seizures.",
    advice: "Avoid NSAIDs while on Lithium. Use Paracetamol for pain. Monitor Lithium blood levels."
  },
  {
    drugs: ["Ciprofloxacin", "Levothyroxine"],
    severity: "medium",
    warning: "CAUTION — Ciprofloxacin reduces absorption of Levothyroxine. Your thyroid medication may not work properly.",
    advice: "Take Levothyroxine at least 4 hours before or after Ciprofloxacin."
  },
  {
    drugs: ["Digoxin", "Amoxicillin"],
    severity: "medium",
    warning: "CAUTION — Some antibiotics increase Digoxin levels by altering gut bacteria. Risk of Digoxin toxicity.",
    advice: "Monitor for nausea, vision changes, or irregular heartbeat. Doctor may need to adjust Digoxin dose."
  },
  {
    drugs: ["Phenytoin", "Carbamazepine"],
    severity: "medium",
    warning: "CAUTION — Complex interaction. Each drug affects the metabolism of the other, making blood levels unpredictable.",
    advice: "Requires careful monitoring of blood levels for both drugs. Only combine under specialist supervision."
  },
  {
    drugs: ["Gabapentin", "Tramadol"],
    severity: "medium",
    warning: "CAUTION — Both drugs cause sedation and affect the central nervous system. Risk of excessive drowsiness and breathing problems.",
    advice: "If prescribed together, start at low doses. Avoid driving. Report extreme drowsiness."
  },
  {
    drugs: ["Sildenafil", "Amlodipine"],
    severity: "medium",
    warning: "CAUTION — Both lower blood pressure. Combined use may cause dangerous hypotension (extremely low BP), dizziness, and fainting.",
    advice: "Use with caution. Avoid taking together without doctor guidance. Do not use with nitrates."
  },
  {
    drugs: ["Prednisolone", "Ibuprofen"],
    severity: "medium",
    warning: "CAUTION — Both drugs irritate the stomach lining. Combined use significantly increases risk of stomach ulcers and GI bleeding.",
    advice: "Take with food. Consider adding a PPI (stomach protector). Monitor for stomach pain or dark stool."
  },
  {
    drugs: ["Diazepam", "Tramadol"],
    severity: "high",
    warning: "DANGEROUS — Both cause respiratory depression. Combined use can cause slowed breathing, extreme sedation, and death.",
    advice: "NEVER combine without explicit medical supervision. If prescribed together, doctor must monitor closely."
  },
];

export function checkInteractions(medicines) {
  const results = [];
  const normalized = medicines.map(m => {
    const found = medicineDatabase.find(db =>
      db.name.toLowerCase() === m.toLowerCase() ||
      db.aliases.some(a => a.toLowerCase() === m.toLowerCase())
    );
    return found ? found.name : m;
  });

  for (let i = 0; i < normalized.length; i++) {
    for (let j = i + 1; j < normalized.length; j++) {
      const pair = [normalized[i], normalized[j]];
      const match = interactions.find(int =>
        (int.drugs.includes(pair[0]) && int.drugs.includes(pair[1]))
      );
      if (match) {
        results.push({ ...match, pair });
      }
    }
  }

  return results;
}
