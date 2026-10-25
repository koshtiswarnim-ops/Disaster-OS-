// DisasterOS Citizen Emergency SOS & Life-Safety Distress Gateway
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDisaster } from '../context/DisasterContext';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldAlert, 
  MapPin, 
  Users, 
  HeartPulse, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Send, 
  Search, 
  AlertTriangle,
  LocateFixed,
  PhoneCall,
  Waves,
  Activity,
  Building2,
  Flame,
  Droplets,
  LifeBuoy,
  ArrowRight,
  ShieldCheck,
  Home
} from 'lucide-react';
import { DisasterMap } from '../components/map/DisasterMap';

const EMERGENCY_TYPES = [
  { id: 'flood', label: 'Flash Flood / Rising Water', icon: Waves },
  { id: 'medical', label: 'Medical / Trauma Emergency', icon: Activity },
  { id: 'structural_collapse', label: 'Building / Structural Collapse', icon: Building2 },
  { id: 'fire', label: 'Wildfire / Chemical Hazard', icon: Flame },
  { id: 'water_food', label: 'Potable Water / Rations Cut Off', icon: Droplets },
  { id: 'evacuation', label: 'Trapped / Evacuation Needed', icon: LifeBuoy },
];

export const CitizenSOSPage: React.FC = () => {
  const { submitSOS, incidents } = useDisaster();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [selectedType, setSelectedType] = useState<string>('flood');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [address, setAddress] = useState<string>('Marina Blvd, San Francisco, CA');
  const [latitude, setLatitude] = useState<number>(37.7749);
  const [longitude, setLongitude] = useState<number>(-122.4194);
  const [affectedCount, setAffectedCount] = useState<number>(2);
  const [injuredCount, setInjuredCount] = useState<number>(0);
  const [trappedCount, setTrappedCount] = useState<number>(0);
  const [hasChildrenElderly, setHasChildrenElderly] = useState<boolean>(true);
  const [medicalUrgency, setMedicalUrgency] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);

  // Success state with live tracking
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // Auto-detect browser GPS coordinates
  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(Number(position.coords.latitude.toFixed(4)));
          setLongitude(Number(position.coords.longitude.toFixed(4)));
          setAddress(`GPS Fix (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`);
          setIsDetectingLocation(false);
        },
        () => {
          alert('GPS detection failed or permission denied. Please enter address manually.');
          setIsDetectingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      alert('Browser geolocation is not supported on this device.');
      setIsDetectingLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please describe your emergency situation.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitSOS({
        type: selectedType,
        title: title || `${selectedType.toUpperCase()} Emergency — ${address || 'Civic Sector'}`,
        description,
        address: address || 'Current Location',
        latitude,
        longitude,
        affected_count: affectedCount,
        injured_count: injuredCount,
        trapped_count: trappedCount,
        has_children_elderly: hasChildrenElderly,
        medical_urgency: medicalUrgency
      });

      setTrackingResult(res);
      setShowSuccessModal(true);
      setDescription('');
      setTitle('');
    } catch (err: any) {
      alert(`Submission error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 bg-[#05070d] text-white flex flex-col pb-16 selection:bg-[#38bdf8] selection:text-[#020617]">
      
      {/* Top Banner */}
      <div className="bg-[#0A1022] border-b border-white/[0.08] px-4 py-5 sm:px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link to="/citizen/dashboard" className="text-xs text-[#38bdf8] hover:underline flex items-center gap-1">
                <span>Citizen Dashboard</span>
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF5D67] font-bold">
                DISTRESS BEACON DISPATCH
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Report Emergency SOS
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/citizen/track"
              className="pill-button-secondary text-xs py-2 px-3.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Track Active SOS</span>
            </Link>
            <Link
              to="/citizen/map"
              className="pill-button-secondary text-xs py-2 px-3.5 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#55D6A7]" />
              <span>Safe Shelters</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 w-full mt-6 space-y-6">

        {/* Live Safety Directives Alert Banner */}
        <div className="p-4 rounded-3xl bg-[#FF5D67]/10 border border-[#FF5D67]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#FF5D67]/20 border border-[#FF5D67]/40 flex items-center justify-center text-[#FF5D67] shrink-0">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-bold text-white block">
                Direct Emergency First-Responder Transmission Link
              </span>
              <span className="text-white/70">
                GPS coordinates lock automatically and route directly to EOC Search & Rescue taskforces.
              </span>
            </div>
          </div>
          <span className="font-mono text-[10.5px] text-[#FF5D67] bg-[#FF5D67]/15 px-3 py-1 rounded-full border border-[#FF5D67]/30 shrink-0">
            PRIORITY 1 TRANSMISSION
          </span>
        </div>

        {/* Instant Distress Presets */}
        <div className="p-4 rounded-2xl bg-[#0D162B] border border-white/10 space-y-2 text-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 font-bold block">
            Instant Crisis Presets (Click to autofill):
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedType('flood');
                setTitle('Rising Flood Waters Trapping Evacuees');
                setDescription('Water standing at 3.8 feet and rising fast. Electrical mains sparking. 2 adults and 1 elderly person trapped on ground floor.');
                setAffectedCount(3);
                setTrappedCount(3);
                setHasChildrenElderly(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-[#38bdf8]/15 hover:bg-[#38bdf8]/25 border border-[#38bdf8]/30 text-[#7dd3fc] font-semibold text-xs cursor-pointer transition-colors"
            >
              🌊 Rising Flood Trapped
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedType('medical');
                setTitle('Severe Trauma & Medical Shock');
                setDescription('Civilian sustaining deep laceration and head trauma from falling masonry. Heavy bleeding, conscious but disoriented.');
                setAffectedCount(1);
                setInjuredCount(1);
                setMedicalUrgency(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-[#FF5D67]/15 hover:bg-[#FF5D67]/25 border border-[#FF5D67]/30 text-[#FF5D67] font-semibold text-xs cursor-pointer transition-colors"
            >
              ❤️ Acute Medical Trauma
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedType('evacuation');
                setTitle('Submerged Viaduct / Boat Extraction Needed');
                setDescription('Both access roads completely submerged. Water too deep for passenger car. Requesting swiftwater rescue boat extraction.');
                setAffectedCount(4);
                setTrappedCount(4);
              }}
              className="px-3 py-1.5 rounded-xl bg-[#FFB454]/15 hover:bg-[#FFB454]/25 border border-[#FFB454]/30 text-[#FFB454] font-semibold text-xs cursor-pointer transition-colors"
            >
              🚤 Swiftwater Boat Extraction
            </button>
          </div>
        </div>

        {/* SOS Submission Form */}
        <div className="terra-card p-6 sm:p-8 space-y-6 bg-[#0D162B]/90 border border-white/15 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="w-8 h-8 rounded-xl bg-[#FF5D67]/20 border border-[#FF5D67]/40 flex items-center justify-center text-[#FF5D67]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                Emergency Distress Telemetry Form
              </h2>
              <p className="text-xs text-white/60">
                Transmissions are ingested directly into the Operator Command Center with AI priority ranking.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Emergency Type Selection */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-white/70 block">
                1. Select Emergency Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {EMERGENCY_TYPES.map((t) => {
                  const isSelected = selectedType === t.id;
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedType(t.id)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#38bdf8] text-[#020617] font-bold border-[#38bdf8] shadow-lg shadow-[#38bdf8]/20'
                          : 'bg-[#05070d] border-white/10 text-white/70 hover:text-white hover:border-white/25'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#020617]' : 'text-[#38bdf8]'}`} />
                      <span className="text-xs leading-tight">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Emergency Details */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-white/70 block mb-1.5">
                  2. Headline / Emergency Situation Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Flooded ground floor, trapped on roof"
                  className="w-full bg-[#05070d] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#38bdf8]"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-white/70 block mb-1.5">
                  3. Distress Description & Immediate Lethality Hazards <span className="text-[#FF5D67]">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={3}
                  placeholder="Describe your immediate danger, visible hazards (water height, downed wires, structural shift), and specific medical vulnerabilities..."
                  className="w-full bg-[#05070d] border border-white/15 rounded-xl p-3.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#38bdf8] resize-none"
                />
              </div>
            </div>

            {/* Step 3: Location detection & Interactive Pinned Map */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-white/70">
                  4. Location & Geographic Coordinates
                </label>
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={isDetectingLocation}
                  className="text-xs text-[#38bdf8] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <LocateFixed className="w-3.5 h-3.5" />
                  <span>{isDetectingLocation ? 'Acquiring GPS Fix...' : 'Acquire My GPS Coordinates'}</span>
                </button>
              </div>

              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, landmark, or intersection"
                className="w-full bg-[#05070d] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#38bdf8]"
              />

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-white/50 block mb-1">Latitude:</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={latitude}
                    onChange={(e) => setLatitude(Number(e.target.value))}
                    className="w-full bg-[#05070d] border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/50 block mb-1">Longitude:</span>
                  <input
                    type="number"
                    step="0.0001"
                    value={longitude}
                    onChange={(e) => setLongitude(Number(e.target.value))}
                    className="w-full bg-[#05070d] border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </div>

              {/* Pinpoint Interactive Map */}
              <div className="rounded-2xl border border-white/15 overflow-hidden bg-[#05070d]">
                <div className="bg-[#0A1022] px-3.5 py-2 border-b border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <MapPin className="w-3.5 h-3.5 text-[#FF5D67]" />
                    <span>Click anywhere on the map to pin exact distress coordinates</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#38bdf8] font-bold">
                    {latitude.toFixed(4)}, {longitude.toFixed(4)}
                  </span>
                </div>
                <div className="p-1">
                  <DisasterMap
                    height="260px"
                    enableMapClick={true}
                    centerCoordinates={[latitude, longitude]}
                    zoomLevel={15}
                    previewLocation={[latitude, longitude]}
                    previewLabel={address || 'Pinned SOS Location'}
                    showFocusControls={false}
                    onLocationSelect={(lat, lng) => {
                      setLatitude(lat);
                      setLongitude(lng);
                      setAddress((prev) => prev || `Pinned Coordinates (${lat}, ${lng})`);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Demographics & Urgency */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-white/70 block">
                5. Demographics & Vulnerability Assessment
              </label>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-[#05070d] border border-white/15">
                  <span className="text-[10px] font-mono uppercase text-white/50 block mb-1">Persons in Need</span>
                  <input
                    type="number"
                    min="1"
                    value={affectedCount}
                    onChange={(e) => setAffectedCount(Number(e.target.value))}
                    className="w-16 mx-auto text-center font-bold text-white rounded-lg border border-white/20 py-1 text-sm bg-white/5 font-mono"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-[#05070d] border border-white/15">
                  <span className="text-[10px] font-mono uppercase text-white/50 block mb-1">Injured Persons</span>
                  <input
                    type="number"
                    min="0"
                    value={injuredCount}
                    onChange={(e) => setInjuredCount(Number(e.target.value))}
                    className="w-16 mx-auto text-center font-bold text-[#FF5D67] rounded-lg border border-white/20 py-1 text-sm bg-white/5 font-mono"
                  />
                </div>

                <div className="p-3.5 rounded-2xl bg-[#05070d] border border-white/15">
                  <span className="text-[10px] font-mono uppercase text-white/50 block mb-1">Trapped Persons</span>
                  <input
                    type="number"
                    min="0"
                    value={trappedCount}
                    onChange={(e) => setTrappedCount(Number(e.target.value))}
                    className="w-16 mx-auto text-center font-bold text-[#FFB454] rounded-lg border border-white/20 py-1 text-sm bg-white/5 font-mono"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className="p-3.5 rounded-2xl bg-[#05070d] border border-white/15 flex items-center justify-between cursor-pointer hover:border-white/30">
                  <span className="text-white/80 font-medium">Children or Elderly Persons Present</span>
                  <input
                    type="checkbox"
                    checked={hasChildrenElderly}
                    onChange={(e) => setHasChildrenElderly(e.target.checked)}
                    className="w-4 h-4 accent-[#38bdf8] rounded"
                  />
                </label>

                <label className="p-3.5 rounded-2xl bg-[#05070d] border border-white/15 flex items-center justify-between cursor-pointer hover:border-white/30">
                  <span className="text-white/80 font-medium">Critical Medical / Oxygen Urgency</span>
                  <input
                    type="checkbox"
                    checked={medicalUrgency}
                    onChange={(e) => setMedicalUrgency(e.target.checked)}
                    className="w-4 h-4 accent-[#38bdf8] rounded"
                  />
                </label>
              </div>
            </div>

            {/* Submission Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-[11px] font-mono text-white/50">
                Dispatches immediately to municipal EOC & nearest rescue boats/EMS
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FF5D67] hover:bg-[#ff434e] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#FF5D67]/40 transition-all hover:scale-105 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmitting Distress Beacon...' : 'TRANSMIT EMERGENCY SOS'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showSuccessModal && trackingResult && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#0A1022] rounded-3xl border border-[#55D6A7]/40 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#55D6A7]/20 border border-[#55D6A7]/40 text-[#55D6A7] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#55D6A7]/20 text-[#55D6A7] border border-[#55D6A7]/30">
                  DISTRESS SIGNAL LOGGED
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  SOS Dispatched to First Responders
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D162B] border border-white/10 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Tracking Code:</span>
                <span className="font-mono font-bold text-sm text-[#38bdf8] bg-[#38bdf8]/15 px-2.5 py-0.5 rounded-lg border border-[#38bdf8]/30">
                  #{trackingResult.tracking_code || trackingResult.incident?.tracking_code}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Triage Priority Score:</span>
                <span className="font-bold text-[#FF5D67] font-mono text-xs">
                  {trackingResult.priority?.priorityScore || trackingResult.incident?.priority_score || 92}/100 (Critical)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Status:</span>
                <span className="font-bold text-[#55D6A7]">
                  Queued in Operator EOC
                </span>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              <strong>Stay on high ground:</strong> First responders have been queued for deployment to your coordinates. You can monitor the live rescue progression using your tracking code.
            </p>

            <div className="pt-2 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate(`/citizen/track/${trackingResult.tracking_code || trackingResult.incident?.tracking_code}`);
                }}
                className="btn-primary text-xs py-2 px-5 font-bold flex items-center gap-2 cursor-pointer"
              >
                <span>Track Rescue Progress</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
