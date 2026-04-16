import React from 'react';
import { 
  User, Diamond, Landmark, ScanFace, ShieldCheck, Key, 
  Banknote, Globe, Moon, CreditCard, HelpCircle, Shield, 
  ChevronRight, ArrowUpRight 
} from 'lucide-react';

interface SettingsProps {
  profileImage: string;
}

export default function Settings({ profileImage }: SettingsProps) {
  return (
    <div className="space-y-10 pb-12">
      {/* User Profile Header */}
      <section className="text-center pt-4">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border border-primary/20 p-1 bg-surface-container-highest">
            <img 
              alt="Julian Thorne Profile" 
              className="w-full h-full object-cover rounded-xl filter grayscale hover:grayscale-0 transition-all duration-500" 
              src={profileImage}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-br from-primary to-primary-container text-on-primary text-[9px] px-3 py-1 rounded-full font-bold tracking-widest uppercase shadow-lg whitespace-nowrap">
            Obsidian Executive
          </div>
        </div>
        <h2 className="font-headline text-3xl text-on-surface mt-4 mb-1">Julian Thorne</h2>
        <p className="text-on-surface-variant text-sm font-light tracking-wide italic">julian.thorne@obsidian.flow</p>
      </section>

      {/* Settings List */}
      <div className="space-y-10">
        
        {/* Account */}
        <div>
          <h3 className="font-headline text-2xl text-primary mb-4 px-2 italic">Account</h3>
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/5 overflow-hidden">
            <div className="flex items-center justify-between p-4 hover:bg-surface-container transition-colors group cursor-pointer border-b border-outline-variant/5">
              <div className="flex items-center gap-4">
                <User className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium tracking-tight">Personal Info</span>
              </div>
              <ChevronRight className="w-4 h-4 text-on-surface-variant" />
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-surface-container transition-colors group cursor-pointer border-b border-outline-variant/5">
              <div className="flex items-center gap-4">
                <Diamond className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium tracking-tight">Wealth Tier</span>
              </div>
              <ChevronRight className="w-4 h-4 text-on-surface-variant" />
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-surface-container transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <Landmark className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium tracking-tight">Connected Banks</span>
              </div>
              <ChevronRight className="w-4 h-4 text-on-surface-variant" />
            </div>
          </div>
        </div>

        {/* Security */}
        <div>
          <h3 className="font-headline text-2xl text-primary mb-4 px-2 italic">Security</h3>
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/5 overflow-hidden">
            <div className="flex items-center justify-between p-4 group border-b border-outline-variant/5">
              <div className="flex items-center gap-4">
                <ScanFace className="w-5 h-5 text-on-surface-variant" />
                <span className="text-sm font-medium tracking-tight">Face ID / Biometrics</span>
              </div>
              {/* Toggle Switch */}
              <div className="w-10 h-5 bg-primary rounded-full relative flex items-center px-0.5 cursor-pointer">
                <div className="w-4 h-4 bg-on-primary rounded-full ml-auto"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-surface-container transition-colors group cursor-pointer border-b border-outline-variant/5">
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium tracking-tight">2FA Authenticator</span>
              </div>
              <ChevronRight className="w-4 h-4 text-on-surface-variant" />
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-surface-container transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <Key className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium tracking-tight">Security Key</span>
              </div>
              <ChevronRight className="w-4 h-4 text-on-surface-variant" />
            </div>
          </div>
        </div>

        {/* App Preferences */}
        <div>
          <h3 className="font-headline text-2xl text-primary mb-4 px-2 italic">App Preferences</h3>
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/5 overflow-hidden">
            <div className="flex items-center justify-between p-4 hover:bg-surface-container transition-colors group cursor-pointer border-b border-outline-variant/5">
              <div className="flex items-center gap-4">
                <Banknote className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium tracking-tight">Currency</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-on-surface-variant font-medium">USD</span>
                <ChevronRight className="w-4 h-4 text-on-surface-variant" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-surface-container transition-colors group cursor-pointer border-b border-outline-variant/5">
              <div className="flex items-center gap-4">
                <Globe className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium tracking-tight">Language</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-on-surface-variant font-medium">French</span>
                <ChevronRight className="w-4 h-4 text-on-surface-variant" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-surface-container transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <Moon className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium tracking-tight">Theme</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-on-surface-variant font-medium">Dark</span>
                <ChevronRight className="w-4 h-4 text-on-surface-variant" />
              </div>
            </div>
          </div>
        </div>

        {/* Subscription */}
        <div>
          <h3 className="font-headline text-2xl text-primary mb-4 px-2 italic">Subscription</h3>
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative bg-surface-container-low border border-primary/20 rounded-xl p-5 flex items-center justify-between overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="bg-on-surface w-12 h-8 rounded flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-background" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight uppercase">Black Card Membership</h4>
                  <p className="text-[10px] text-primary tracking-widest font-medium uppercase mt-1">Status: Active</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-headline text-2xl text-primary mb-4 px-2 italic">Support</h3>
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/5 overflow-hidden">
            <div className="flex items-center justify-between p-4 hover:bg-surface-container transition-colors group cursor-pointer border-b border-outline-variant/5">
              <div className="flex items-center gap-4">
                <HelpCircle className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium tracking-tight">Help Center</span>
              </div>
              <ChevronRight className="w-4 h-4 text-on-surface-variant" />
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-surface-container transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <Shield className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium tracking-tight">Privacy Policy</span>
              </div>
              <ChevronRight className="w-4 h-4 text-on-surface-variant" />
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="pt-4 text-center">
          <button className="text-on-surface-variant/40 hover:text-red-400 transition-colors text-xs font-medium tracking-widest uppercase py-4 flex items-center justify-center gap-2 mx-auto">
            Sign Out
          </button>
        </div>

      </div>
    </div>
  );
}
