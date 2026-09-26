# Assets Ay-Habo

Ce dossier contient les ressources statiques utilisées par le site Ay-Habo.

## Logo

Le logo définitif doit être placé directement dans ce dossier avec exactement ce nom :

`logo.svg`

Chemin dans le projet :

`public/assets/logo.svg`

Next.js expose automatiquement le contenu de `public/` à la racine du site. Ainsi :

`public/assets/logo.svg`

est accessible par :

`/assets/logo.svg`

Le `Header` et le `Footer` utilisent déjà ce chemin. **Ne pas ajouter `/public` dans le chemin utilisé par le code.**

## Fichier temporaire

`placeholder.svg` est un SVG de remplacement fourni pour les tests. Il ne remplace pas le fichier définitif attendu par le Header et le Footer.

Lorsque le vrai logo est uploadé, il doit donc être enregistré sous :

`public/assets/logo.svg`

## Structure attendue

```
public/
└── assets/
    ├── logo.svg
    ├── placeholder.svg
    └── README.md
```
