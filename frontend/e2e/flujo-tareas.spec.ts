import { test, expect } from '@playwright/test'

test('un usuario puede crear una tarea y verla en la lista', async ({ page }) => {
  const tareas: { id: number; text: string; completed: boolean }[] = []

  await page.route('**/tasks', async (route) => {
    const method = route.request().method()
    if (method === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(tareas),
      })
    } else if (method === 'POST') {
      const payload = JSON.parse(route.request().postData() || '{}')
      const nuevaTarea = { id: Date.now(), text: payload.text, completed: false }
      tareas.push(nuevaTarea)
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(nuevaTarea),
      })
    }
  })

  // 1. Entrar a la aplicación
  await page.goto('/')

  // 2. Crear una tarea
  await page.getByLabel('Nueva tarea').fill('Comprar pan')
  await page.getByRole('button', { name: 'Agregar' }).click()

  // 3. Verla en la lista
  await expect(page.getByText('Comprar pan')).toBeVisible()
})