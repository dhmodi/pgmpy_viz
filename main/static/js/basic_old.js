console.log("loda");
var currentState = "None";

function getMousePos(canvas, event) {
/**/
  var mouseX = event.pageX - canvas.offsetLeft;
  var mouseY = event.pageY - canvas.offsetTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

$(document).keydown(function(e){

    // If delete key is pressed delete selected elements.
    if (e.keyCode == 46) {
        to_be_deleted = cy.$(":selected");
        cy.remove(to_be_deleted);
    }


  ready: function(){
    window.cy = this;// don't know

    // giddy up
  }
});


NODE_ID = 1
EDGE_ID = 1
source_node_id = null;
target_node_id = null;

CREATE_NODE_STATE = false
CREATE_EDGE_STATE = false

function toggleAddNodeState()
{
    createnodebtn_obj = $("#create-node-toggle")
    if (CREATE_NODE_STATE == true){
        CREATE_NODE_STATE = false
        createnodebtn_obj.text("Start Adding Nodes")
        createnodebtn_obj.removeClass("btn-danger")
        createnodebtn_obj.addClass("btn-success")
    } else {
        CREATE_NODE_STATE = true
        createnodebtn_obj.text("Stop Adding Nodes")
        createnodebtn_obj.removeClass("btn-success")
        createnodebtn_obj.addClass("btn-danger")
    }
}

function toggleAddEdgeState()
{
    addedgesbtn_obj = $("#create-edge-toggle")
    if (CREATE_EDGE_STATE == true){
        CREATE_EDGE_STATE = false
        addedgesbtn_obj.text("Start Adding Edges")
        addedgesbtn_obj.removeClass("btn-danger")
        addedgesbtn_obj.addClass("btn-success")
    } else {
        CREATE_EDGE_STATE = true
        addedgesbtn_obj.text("Stop Adding Edges")
        addedgesbtn_obj.removeClass("btn-success")
        addedgesbtn_obj.addClass("btn-danger")

        // Unselect all selected elements to avoid bugs.
        cy.$(":selected").unselect()
        source_node_id = null;
        target_node_id = null;

    }
}


$("#create-node-toggle").click(function(event){
   if (CREATE_EDGE_STATE == true){
        toggleAddEdgeState()
   }
   toggleAddNodeState()
});

$("#create-edge-toggle").click(function(event){
   if (CREATE_NODE_STATE == true){
        toggleAddNodeState()
   }
   toggleAddEdgeState()
});


/**********************************************************
   Adding a Node:
   - We add a node on a click only when in Create Node State.
   Adding an Edge:
   - Select from node, Select to node.
   - An edge is created between these nodes.
**********************************************************/
$("#cy").click(function(event){
    if (CREATE_NODE_STATE == true) {

        pos = getMousePos(this,event)
        node_id_str = "n" + NODE_ID.toString()

        cy.add([
          { group: "nodes", data: { id: node_id_str, weight: 70 }, renderedPosition: pos },
        ]);

        NODE_ID += 1
    }

    if (CREATE_EDGE_STATE == true) {
        selected_elements = cy.elements(":selected")
        if (selected_elements.length == 0){
            source_node_id = null;
            return
        }

        if (!source_node_id){
            source_node_id = selected_elements.eq(0).id()
            return
        }

        if (source_node_id && !target_node_id){
            target_node_id = selected_elements.eq(0).id()
        }


        // Only add an edge if both source and target are selected.
        if (source_node_id && target_node_id && source_node_id != target_node_id){
            edge_id_str = "e" + EDGE_ID.toString()

            cy.add([
              { group: "edges", data: { source: source_node_id, target: target_node_id, color: '#86B342', strength: 100 },}
            ]);

            cy.$(":selected").unselect()

            EDGE_ID += 1

            // Reset the source and target parameters.
            // So that a user can start drawing an edge again.
            source_node_id = null;
            target_node_id = null;
        }
    }
});




});
/*
$('#cy').cytoscape({
  layout: {
    name: 'circle'
  },

  showOverlay: false,

  minZoom: 0.1,
  maxZoom: 10,

  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'shape': 'data(shape)',
        'height': 'mapData(weight, 0, 100, 20, 70)',
        'width': 'mapData(weight, 0, 100, 20, 70)',
        'content': 'data(name)',
        'text-valign': 'center',
        'text-outline-width': 2,
        'text-outline-color': 'data(color)',
        'background-color': 'data(color)',
        'color': '#fff'
      })
    .selector(':selected')
      .css({
        'border-width': 5,
        'border-color': '#000000',
      })
    .selector('edge')
      .css({
        'width': 'mapData(strength, 70, 100, 2, 6)',
        'target-arrow-shape': 'triangle',
        'source-arrow-shape': 'none',
        'line-color': 'data(color)',
        'source-arrow-color': 'data(color)',
        'target-arrow-color': 'data(color)',
      })
    .selector('edge.questionable')
      .css({
        'line-style': 'dotted',
        'target-arrow-shape': 'diamond'
      })
    .selector('.faded')
      .css({
        'opacity': 0.25,
        'text-opacity': 0
      }),

  elements: {
    nodes: [
      { data: { id: 'dummy1', name: 'Dummynode1', color: '#ffffff', shape: 'ellipse' } },
      { data: { id: 'dummy2', name: 'Dummynode2', color: '#ffffff', shape: 'ellipse' } },
    ],
  },
*/
