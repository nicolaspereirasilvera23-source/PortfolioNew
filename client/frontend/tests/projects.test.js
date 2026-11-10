import test from 'node:test';
import assert from 'node:assert/strict';
import { getProjectsByGroup, projects } from '../src/projects.js';

const byName = name => projects.find(project => project.name === name);
test('cada ficha tiene descripción, objetivo/contribución, stack y enlace válido', () => {
  assert.equal(projects.length, 9);
  for (const project of projects) {
    assert.ok(project.name && project.description && project.detail, project.name);
    assert.ok(Array.isArray(project.stack) && project.stack.length, project.name);
    assert.ok([project.url, project.repo].some(link => /^https:\/\//.test(link || '')), project.name);
    assert.ok(['trabajos', 'propios', 'colaboraciones'].includes(project.group), project.name);
  }
});
test('separa correctamente trabajos freelance y proyectos propios', () => {
  assert.equal(getProjectsByGroup('trabajos').length, 3);
  assert.equal(getProjectsByGroup('propios').length, 5);
  assert.equal(getProjectsByGroup('colaboraciones').length, 1);
  assert.ok(getProjectsByGroup('trabajos').every(project => project.group === 'trabajos'));
  assert.equal(getProjectsByGroup('colaboraciones')[0].name, 'Qubik Timer');
});
test('las fichas mantienen demo y repositorio como enlaces distintos', () => {
  for (const project of projects.filter(project => project.repo)) {
    assert.match(project.repo, /^https:\/\/github\.com\//, project.name);
    if (project.url) assert.notEqual(project.url, project.repo, project.name);
  }
  assert.equal(byName('QRLY').url, undefined);
  assert.equal(byName('Assistance System SVC').url, undefined);
});
test('SVC y QRLY no anuncian demos públicas mientras están en correcciones', () => {
  for (const name of ['Assistance System SVC', 'QRLY']) {
    const project = byName(name);
    assert.match(project.status, /correcciones/i);
    assert.match(project.detail, /sin demo pública|no tiene demo pública/i);
  }
});
test('bot documental refleja flujo y ahorro declarado', () => {
  const bot = byName('Bot de consulta de carnés SENade');
  assert.match(bot.detail, /16 cédulas/i);
  assert.match(bot.detail, /cinco horas.*20 minutos/i);
  assert.ok(bot.repo.endsWith('/validation-documentals-bot'));
});
test('museo incluye alcance completo y branch administrativo', () => {
  const museum = byName('Museo Ezequiel Zamora');
  assert.match(museum.detail, /panel y backend/i);
  assert.match(museum.detail, /rama dashboard/i);
  assert.ok(museum.stack.includes('Go') && museum.stack.includes('Resend'));
});

