"use client";

import { useEffect, useState, createContext, useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const TourContext = createContext({});

export function TourProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check where we are in the tour
    const tourStep = localStorage.getItem("bsprep_tour_step");

    if (!tourStep || tourStep === "completed") return;

    // A small delay to ensure DOM is fully rendered after navigation
    const timeout = setTimeout(() => {
      if (tourStep === "1" && pathname === "/dashboard") {
        const d = driver({
          showProgress: true,
          allowClose: false,
          popoverClass: 'driverjs-theme',
          steps: [
            {
              element: '#tour-referral-link',
              popover: {
                title: 'The Referral Engine',
                description: 'Your personalized dashboard tracks every peer you invite. Use your unique referral link to bring students to the platform and earn points!',
                side: "top",
                align: 'center',
                onNextClick: () => {
                  d.destroy();
                  localStorage.setItem("bsprep_tour_step", "2");
                  router.push("/dashboard/leaderboard");
                }
              }
            }
          ]
        });
        d.drive();
      } else if (tourStep === "2" && pathname === "/dashboard/leaderboard") {
        const d = driver({
          showProgress: true,
          allowClose: false,
          popoverClass: 'driverjs-theme',
          steps: [
            {
              element: '#tour-leaderboard-header',
              popover: {
                title: 'Global Leaderboard',
                description: 'See how you stack up against other ambassadors across the country. The higher your rank, the better your rewards!',
                side: "top",
                align: 'center',
                onNextClick: () => {
                  d.destroy();
                  localStorage.setItem("bsprep_tour_step", "3");
                  router.push("/dashboard/rewards");
                }
              }
            }
          ]
        });
        d.drive();
      } else if (tourStep === "3" && pathname === "/dashboard/rewards") {
        const d = driver({
          showProgress: true,
          allowClose: false,
          popoverClass: 'driverjs-theme',
          steps: [
            {
              element: '#tour-rewards-list',
              popover: {
                title: 'Premium Rewards',
                description: 'Redeem your points for official BSPrep Swag, custom .XYZ domains, and personalized Letters of Recommendation!',
                side: "top",
                align: 'center',
                onNextClick: () => {
                  d.destroy();
                  localStorage.setItem("bsprep_tour_step", "4");
                  router.push("/dashboard/bounties");
                }
              }
            }
          ]
        });
        d.drive();
      } else if (tourStep === "4" && pathname === "/dashboard/bounties") {
        const d = driver({
          showProgress: true,
          allowClose: false,
          popoverClass: 'driverjs-theme',
          steps: [
            {
              element: '#tour-bounties-list',
              popover: {
                title: 'Bounty Tasks',
                description: 'Want to earn points faster? Complete high-value tasks like Instagram posts or hosting campus sessions, and submit proof right here.',
                side: "top",
                align: 'center',
                onNextClick: () => {
                  d.destroy();
                  localStorage.setItem("bsprep_tour_step", "5");
                  router.push("/dashboard/referrals");
                }
              }
            }
          ]
        });
        d.drive();
      } else if (tourStep === "5" && pathname === "/dashboard/referrals") {
        const d = driver({
          showProgress: true,
          allowClose: false,
          popoverClass: 'driverjs-theme',
          steps: [
            {
              element: '#tour-referrals-header',
              popover: {
                title: 'Your Network',
                description: 'Keep track of every single student who signs up using your code. Watch your network and influence grow!',
                side: "top",
                align: 'center',
                onNextClick: () => {
                  d.destroy();
                  localStorage.setItem("bsprep_tour_step", "6");
                  router.push("/dashboard/announcements");
                }
              }
            }
          ]
        });
        d.drive();
      } else if (tourStep === "6" && pathname === "/dashboard/announcements") {
        const d = driver({
          showProgress: true,
          allowClose: false,
          popoverClass: 'driverjs-theme',
          steps: [
            {
              element: '#tour-announcements-header',
              popover: {
                title: 'Stay Updated',
                description: 'Never miss an update. New bounties, townhall meetings, and program announcements will appear here.',
                side: "top",
                align: 'center',
                nextBtnText: 'Finish',
                onNextClick: () => {
                  d.destroy();
                  localStorage.setItem("bsprep_tour_step", "completed");
                  router.push("/dashboard");
                }
              }
            }
          ]
        });
        d.drive();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [pathname, mounted, router]);

  return <TourContext.Provider value={{}}>{children}</TourContext.Provider>;
}
