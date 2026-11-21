import fs from "fs";
import path from "path";

const targetPath = path.join("src", "app", "layout.tsx");
let content = fs.readFileSync(targetPath, "utf8");

if (!content.includes('className="skip-to-content"')) {
  content = content.replace(
    "<body>{children}</body>",
    `<body>\n        <a href="#main-content" className="skip-to-content">\n          Aller au contenu principal\n        </a>\n        {children}\n      </body>`
  );
  fs.writeFileSync(targetPath, content, "utf8");
  console.log("src/app/layout.tsx updated with skip-to-content link!");
} else {
  console.log("skip-to-content already in layout.tsx");
}
