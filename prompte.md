{
  "project": {
    "name": "Cinematic 3D Scroll Orbital Showcase",
    "stack": "React.js + TypeScript",
    "animationEngine": "requestAnimationFrame + math-based transforms",
    "goal": "Créer une section hero cinématique avec orbite 3D réelle, scroll step-by-step, inertie douce et légère rotation de caméra dynamique pour effet premium."
  },

  "folder_structure": {
    "src/": [
      "components/OrbitalScene.tsx",
      "components/OrbitingImages.tsx",
      "components/OrbitItem.tsx",
      "hooks/useScrollStep.ts",
      "hooks/useCameraTilt.ts",
      "utils/orbitMath.ts",
      "utils/easing.ts",
      "styles/orbital.module.css"
    ],
    "public/assets/images/": [
      "main-woman.png",
      "orbit-1.png",
      "orbit-2.png",
      "orbit-3.png",
      "orbit-4.png",
      "orbit-5.png",
      "orbit-6.png"
    ]
  },

  "scene_setup": {
    "outerContainer": {
      "height": "350vh",
      "background": "radial-gradient(circle at center, #c8f7dc 0%, #a8efd0 40%, #7de2b8 100%)"
    },
    "stickyStage": {
      "position": "sticky",
      "top": "0",
      "height": "100vh",
      "perspective": "1400px",
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "center",
      "transformStyle": "preserve-3d"
    },
    "cameraWrapper": {
      "transformStyle": "preserve-3d",
      "willChange": "transform"
    }
  },

  "mathematics_orbit": {
    "variables": {
      "radius": 380,
      "totalItems": 6,
      "deltaTheta": "2 * Math.PI / totalItems",
      "stepAngle": "deltaTheta / 3",
      "rotationAngle": "global state"
    },
    "3dPosition": {
      "x": "radius * Math.cos(theta)",
      "z": "radius * Math.sin(theta)",
      "y": "0"
    },
    "depthEffects": {
      "scale": "0.65 + 0.35 * ((z + radius) / (2 * radius))",
      "opacity": "0.4 + 0.6 * ((z + radius) / (2 * radius))",
      "blur": "(1 - ((z + radius) / (2 * radius))) * 6px",
      "brightness": "0.8 + 0.2 * ((z + radius) / (2 * radius))"
    },
    "looping": "rotationAngle = rotationAngle % (2 * Math.PI)"
  },

  "camera_system": {
    "description": "Simuler une caméra dynamique subtile qui pivote légèrement selon la progression de scroll.",
    "cameraVariables": {
      "cameraTiltX": "max 6deg",
      "cameraTiltY": "max 8deg",
      "cameraDepth": "translateZ(-50px)"
    },
    "calculation": {
      "progress": "scrollY / maxScroll",
      "tiltX": "Math.sin(progress * Math.PI) * 6",
      "tiltY": "Math.cos(progress * Math.PI) * 8"
    },
    "transform": "rotateX(tiltXdeg) rotateY(tiltYdeg) translateZ(-50px)",
    "smoothing": "lerp(currentTilt, targetTilt, 0.08)"
  },

  "scroll_engine": {
    "threshold": 90,
    "logic": [
      "Détecter direction du scroll",
      "Si dépasse threshold → appliquer stepAngle",
      "Définir targetRotation",
      "Interpoler rotationAngle vers targetRotation via lerp",
      "Appliquer modulo 2π"
    ],
    "easing": "easeOutCubic",
    "inertia": true
  },

  "parallax_layers": {
    "backgroundShift": "translateY(scrollProgress * 40px)",
    "foregroundShift": "translateY(scrollProgress * -20px)",
    "depthAmplification": "Les éléments proches amplifient légèrement leur mouvement"
  },

  "react_architecture": {
    "OrbitalScene": "Gère scroll global + caméra",
    "OrbitingImages": "Calcule positions 3D et applique rotation",
    "OrbitItem": "Rendu individuel avec transform 3D dynamique",
    "useScrollStep": "Hook gestion threshold + snapping",
    "useCameraTilt": "Hook gestion rotation caméra + smoothing"
  },

  "performance_rules": [
    "Utiliser uniquement transform et opacity",
    "Ne jamais manipuler top/left",
    "Utiliser requestAnimationFrame",
    "Memoization des calculs mathématiques",
    "Utiliser will-change: transform",
    "Optimiser pour 60fps"
  ],

  "responsive": {
    "mobile": {
      "radius": 240,
      "cameraTiltX": 4,
      "cameraTiltY": 5
    },
    "tablet": {
      "radius": 300
    },
    "desktop": {
      "radius": 380
    }
  },

  "final_experience": {
    "visual": "Les images orbitent réellement en 3D autour de la femme.",
    "camera": "La scène pivote légèrement comme une caméra réelle.",
    "depth": "Les images passent derrière et devant l’image principale.",
    "interaction": "Chaque scroll déclenche une rotation précise avec inertie douce.",
    "feel": "Ultra premium, cinématique, moderne, type Apple landing page."
  },

  "constraints": [
    "No GSAP",
    "No Three.js",
    "No Framer Motion",
    "Only React + CSS + math-based transforms",
    "Production ready code"
  ]
}
