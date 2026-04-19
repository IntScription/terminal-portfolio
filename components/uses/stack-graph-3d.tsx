"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import * as THREE from "three";
import SpriteText from "three-spritetext";
import type { UsesData, UsesItem } from "@/lib/content/site";

const ForceGraph3D = dynamic(
  () => import("react-force-graph-3d").then((mod) => mod.default),
  { ssr: false }
);

type GraphNode = {
  id: string;
  group: string;
  description?: string;
  x?: number;
  y?: number;
  z?: number;
};

type GraphLink = {
  source: string | number | GraphNode | undefined;
  target: string | number | GraphNode | undefined;
};

function colorByGroup(group: string) {
  switch (group) {
    case "framework":
      return "#7dd3fc";
    case "language":
      return "#c4b5fd";
    case "backend":
      return "#86efac";
    case "ui":
      return "#f9a8d4";
    case "infra":
      return "#fcd34d";
    case "system":
      return "#fca5a5";
    default:
      return "#e5e7eb";
  }
}

function prettyGroup(group: string) {
  return group.replace("-", " ");
}

function getNodeId(value: GraphLink["source"]): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (value && typeof value === "object" && "id" in value) {
    return String(value.id);
  }
  return "";
}

function normalizeUsesItem(item: UsesItem, fallbackGroup: string) {
  if (typeof item === "string") {
    return {
      name: item,
      description: `${item} is part of the ${fallbackGroup} setup.`,
      category: "system",
      related: [] as string[],
    };
  }

  return {
    name: item.name,
    description:
      item.description ?? `${item.name} is part of the ${fallbackGroup} setup.`,
    category: item.category ?? "system",
    related: item.related ?? [],
  };
}

function buildGraphFromUses(uses: UsesData) {
  const seen = new Map<string, GraphNode>();
  const links: GraphLink[] = [];

  uses.groups.forEach((group, groupIndex) => {
    group.items.forEach((rawItem, itemIndex) => {
      const item = normalizeUsesItem(rawItem, group.title);

      if (!seen.has(item.name)) {
        seen.set(item.name, {
          id: item.name,
          group: item.category,
          description: item.description,
          x:
            Math.cos((groupIndex + itemIndex + 1) * 0.92) * 240 +
            (Math.random() - 0.5) * 120,
          y:
            Math.sin((groupIndex + itemIndex + 1) * 1.14) * 240 +
            (Math.random() - 0.5) * 120,
          z: (Math.random() - 0.5) * 420,
        });
      }

      item.related.forEach((relatedName) => {
        links.push({
          source: item.name,
          target: relatedName,
        });
      });
    });
  });

  return {
    nodes: Array.from(seen.values()),
    links: links.filter((link) => {
      const source = getNodeId(link.source);
      const target = getNodeId(link.target);
      return source && target && source !== target;
    }),
  };
}

export function StackGraph3D({ uses }: { uses: UsesData }) {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const data = useMemo(() => buildGraphFromUses(uses), [uses]);

  const connectedNodes = useMemo(() => {
    if (!selectedNode) return [];

    return data.links
      .flatMap((edge) => {
        const source = getNodeId(edge.source);
        const target = getNodeId(edge.target);

        if (source === selectedNode.id) return [target];
        if (target === selectedNode.id) return [source];
        return [];
      })
      .filter(Boolean)
      .filter((value, index, array) => array.indexOf(value) === index);
  }, [selectedNode, data.links]);

  const isConnectedToSelected = (nodeId: string) =>
    connectedNodes.includes(nodeId);

  const isLinkSelected = (link: GraphLink) => {
    if (!selectedNode) return false;
    const source = getNodeId(link.source);
    const target = getNodeId(link.target);
    return source === selectedNode.id || target === selectedNode.id;
  };

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-[rgba(var(--border))] bg-black/85 shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="text-xs uppercase tracking-[0.24em] text-white/50">
          stack graph
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-white">
          How the tools connect
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/60">
          This graph is generated from the actual Uses content, so it grows as
          the setup grows.
        </p>
      </div>

      <div className="relative h-140 w-full">
        <ForceGraph3D
          graphData={data}
          backgroundColor="#000000"
          linkOpacity={0.22}
          linkWidth={(rawLink: unknown) => {
            const link = rawLink as GraphLink;
            if (!selectedNode) return 1.35;
            return isLinkSelected(link) ? 3 : 0.9;
          }}
          linkColor={(rawLink: unknown) => {
            const link = rawLink as GraphLink;
            if (!selectedNode) return "rgba(180,220,255,0.30)";
            return isLinkSelected(link)
              ? "rgba(125,211,252,0.88)"
              : "rgba(180,220,255,0.10)";
          }}
          nodeRelSize={7}
          cooldownTicks={220}
          d3AlphaDecay={0.012}
          d3VelocityDecay={0.18}
          enableNodeDrag={false}
          showNavInfo={false}
          controlType="orbit"
          onNodeClick={(rawNode) => {
            const node = rawNode as GraphNode | null;
            if (!node) return;
            setSelectedNode((prev) => (prev?.id === node.id ? null : node));
          }}
          onBackgroundClick={() => {
            setSelectedNode(null);
          }}
          nodeThreeObject={(rawNode) => {
            const node = rawNode as GraphNode;
            const color = colorByGroup(node.group);

            const isSelected = selectedNode?.id === node.id;
            const isConnected = isConnectedToSelected(node.id);

            const group = new THREE.Group();

            const sphereGeometry = new THREE.SphereGeometry(
              isSelected ? 7.8 : isConnected ? 7 : 6.4,
              24,
              24
            );
            const sphereMaterial = new THREE.MeshStandardMaterial({
              color,
              emissive: color,
              emissiveIntensity: isSelected ? 0.95 : isConnected ? 0.6 : 0.42,
              metalness: 0.18,
              roughness: 0.24,
            });

            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            group.add(sphere);

            const glowGeometry = new THREE.SphereGeometry(
              isSelected ? 14 : isConnected ? 12 : 11,
              24,
              24
            );
            const glowMaterial = new THREE.MeshBasicMaterial({
              color,
              transparent: true,
              opacity: isSelected ? 0.24 : isConnected ? 0.14 : 0.08,
            });

            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            group.add(glow);

            const label = new SpriteText(node.id) as unknown as THREE.Object3D;
            (label as any).color = "#e5eefb";
            (label as any).textHeight = isSelected ? 5.7 : 5;
            (label as any).fontFace =
              "ui-monospace, SFMono-Regular, Menlo, monospace";
            (label as any).backgroundColor = isSelected
              ? "rgba(18,30,48,0.95)"
              : isConnected
                ? "rgba(14,20,34,0.88)"
                : "rgba(8,12,20,0.76)";
            (label as any).padding = 3;
            (label as any).borderWidth = 0;
            label.position.set(0, 14, 0);
            group.add(label);

            return group;
          }}
          rendererConfig={{
            antialias: true,
            alpha: true,
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/70 to-transparent" />

        {selectedNode ? (
          <div className="pointer-events-none absolute right-4 top-4 w-80 rounded-3xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                  selected node
                </p>
                <h4 className="mt-2 text-lg font-semibold tracking-tight text-white">
                  {selectedNode.id}
                </h4>
              </div>

              <span
                className="rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.18em]"
                style={{
                  borderColor: `${colorByGroup(selectedNode.group)}55`,
                  color: colorByGroup(selectedNode.group),
                  backgroundColor: `${colorByGroup(selectedNode.group)}18`,
                }}
              >
                {prettyGroup(selectedNode.group)}
              </span>
            </div>

            <p className="mt-4 text-sm leading-7 text-white/72">
              {selectedNode.description}
            </p>

            {connectedNodes.length ? (
              <div className="mt-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                  connected to
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {connectedNodes.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-xs text-white/72"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="pointer-events-none absolute right-4 top-4 w-75 rounded-3xl border border-white/10 bg-black/50 p-4 text-sm text-white/52 backdrop-blur-xl">
            Click a node to inspect it. The graph updates from your real Uses
            content as it grows.
          </div>
        )}
      </div>
    </div>
  );
}
