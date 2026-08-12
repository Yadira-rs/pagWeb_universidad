import { test, expect } from "@playwright/test";

// CP-013: Carga correcta de la página de inicio
test("CP-013 - la página de inicio carga con header, hero y footer", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/FECA/);
  await expect(page.locator("header, .navbar, nav").first()).toBeVisible();
  await expect(page.locator("footer.footer")).toBeVisible();
  await page.screenshot({ path: "test-evidence/cp013-home.png", fullPage: false });
});

// CP-014: Navegación a Servicios muestra las tarjetas de servicio
test("CP-014 - la página de Servicios muestra las tarjetas de servicio", async ({ page }) => {
  await page.goto("/#/servicios");
  await expect(page.getByRole("heading", { name: "Servicios", exact: true })).toBeVisible();
  const cards = page.locator(".service-card");
  await expect(cards.first()).toBeVisible();
  expect(await cards.count()).toBeGreaterThanOrEqual(5);
  await page.screenshot({ path: "test-evidence/cp014-servicios.png", fullPage: true });
});

// CP-015: El buscador del header devuelve resultados
test("CP-015 - el buscador devuelve resultados para 'contraloría'", async ({ page }) => {
  await page.goto("/");
  const searchInput = page.locator('input[name="q"]').first();
  await searchInput.fill("contraloría");
  const dropdown = page.locator(".search-dropdown");
  await expect(dropdown).toBeVisible();
  await expect(dropdown.getByText(/Contraloría/i).first()).toBeVisible();
  await page.screenshot({ path: "test-evidence/cp015-busqueda.png" });
});

// CP-016: La página de Contraloría Interna muestra la tarjeta de encargado
test("CP-016 - Contraloría Interna muestra la tarjeta de encargado", async ({ page }) => {
  await page.goto("/#/servicios/contraloria-interna");
  const card = page.locator(".encargado-card");
  await card.scrollIntoViewIfNeeded();
  await expect(card).toBeVisible();
  await expect(card.getByText("Lic. Ricardo Herrera")).toBeVisible();
  await expect(card.locator("img")).toHaveJSProperty("complete", true);
  await card.screenshot({ path: "test-evidence/cp016-contraloria-encargado.png" });
});

// CP-017: Accesibilidad - el panel de noticias se cierra con Escape
test("CP-017 - el panel de noticias se cierra con la tecla Escape", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir últimas noticias" }).click();
  const panel = page.locator(".slide-panel");
  await expect(panel).toBeVisible();
  await page.screenshot({ path: "test-evidence/cp017-panel-abierto.png" });

  await page.keyboard.press("Escape");
  await expect(page.locator(".panel-overlay.open")).toHaveCount(0);
  await page.screenshot({ path: "test-evidence/cp017-panel-cerrado.png" });
});

// CP-018: Accesibilidad - indicador de foco visible al navegar con teclado
test("CP-018 - los elementos muestran un indicador de foco visible al usar Tab", async ({ page }) => {
  await page.goto("/");
  let outlineWidth = "0px";
  for (let i = 0; i < 8 && outlineWidth === "0px"; i++) {
    await page.keyboard.press("Tab");
    outlineWidth = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return "0px";
      return getComputedStyle(el).outlineWidth;
    });
  }
  expect(outlineWidth).not.toBe("0px");
  await page.screenshot({ path: "test-evidence/cp018-foco-visible.png" });
});

// CP-019: El menú móvil se abre y cierra correctamente
test("CP-019 - el menú móvil se abre y cierra en viewport pequeño", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  const drawer = page.getByRole("dialog", { name: "Navegación principal" });
  await expect(drawer).toBeVisible();
  await page.screenshot({ path: "test-evidence/cp019-menu-abierto.png" });

  await drawer.getByRole("button", { name: "Cerrar menú" }).click();
  await expect(drawer).not.toHaveClass(/open/);
  await page.screenshot({ path: "test-evidence/cp019-menu-cerrado.png" });
});
