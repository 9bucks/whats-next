"use client";
import React, { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import maps from "../../data/maps.json";

function Roadmap() {
  const treeContainer = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const settings = {
    centeringTransitionDuration: 800,
    orientation: "vertical",
    collapsible: true,
    zoomable: true,
    nodeSize: { x: 400, y: 300 },
    pathFunc: "diagonal",
    initialDepth: 1,
    depthFactor: 200,
    scaleExtent: { min: 0.1, max: 1 },
    styles: {
      nodes: {
        node: {
          circle: {
            fill: "#52e2c5",
          },
          attributes: {
            stroke: "#000",
          },
        },
        leafNode: {
          circle: {
            fill: "transparent",
          },
          attributes: {
            stroke: "#000",
          },
        },
      },
    },
    shouldCollapseNeighborNodes: true,
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (treeContainer.current) {
        const dimensions = treeContainer.current.getBoundingClientRect();
        setDimensions({
          width: dimensions.width,
          height: dimensions.height,
        });
        // Update translate on resize
        setTranslate({
          x: dimensions.width / 2,
          y: dimensions.height / 10, // Adjust this value to move the tree up or down
        });
      }
    };

    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        height: "100vh",
        border: "1px solid #ccc", // Optional: helps visualize the container
        position: "relative", // Important for proper positioning
      }}
      ref={treeContainer}
    >
      {dimensions.width > 0 && ( // Only render tree when dimensions are available
        <Tree
          hasInteractiveNodes
          data={maps}
          orientation="vertical"
          translate={translate}
          centeringTransitionDuration={settings.centeringTransitionDuration}
          pathFunc={settings.pathFunc}
          collapsible={settings.collapsible}
          initialDepth={settings.initialDepth}
          depthFactor={settings.depthFactor}
          styles={settings.styles}
          shouldCollapseNeighborNodes={settings.shouldCollapseNeighborNodes}
          draggable
          zoomable={settings.zoomable}
          scaleExtent={settings.scaleExtent}
          nodeSize={settings.nodeSize}
          // separation={{ siblings: 0.4, nonSiblings: 0.2 }} // Add spacing between nodes
          enableLegacyTransitions={false} // Disable legacy transitions for better performance
          onUpdate={(state) => {
            // Optional: handle updates
            console.log("Tree updated:", state);
          }}
        />
      )}
    </div>
  );
}

export default Roadmap;
