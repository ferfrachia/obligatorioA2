// $Id: Form.cs,v 1.1 2009-11-14 14:56:03 gaudenz Exp $
// Copyright (c) 2007-2008, Gaudenz Alder
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Windows.Forms;
using System.Drawing;
using System.Threading;
using System.Diagnostics;
using System.Drawing.Imaging;
using com.mxgraph;

namespace examples
{

    public class GraphForm : Form
    {
        private GraphControl graphControl;

        public GraphForm()
        {
            // Creates graph with model
            mxGraph graph = new mxGraph();
            Object parent = graph.GetDefaultParent();

            // Adds cells into the graph
            graph.Model.BeginUpdate();
            try
            {
                Object v1 = graph.InsertVertex(parent, null, "Hello", 20, 20, 80, 30);
                Object v2 = graph.InsertVertex(parent, null, "World!", 200, 150, 80, 30);
                Object e1 = graph.InsertEdge(parent, null, "e1", v1, v2);
            }
            finally
            {
                graph.Model.EndUpdate();
            }
            
            // Creates a component for the graph
            graphControl = new GraphControl(graph);
            graphControl.Dock = DockStyle.Fill;

            Controls.Add(graphControl);
            Size = new Size(320, 200);
        }
    }

    class GraphControl : Panel
    {

        mxGraph graph;

        Image buffer;

        public GraphControl(mxGraph graph)
        {
            this.graph = graph;
            this.AutoScroll = true;
            this.Paint += new PaintEventHandler(PaintBuffer);
            this.graph.Model.GraphModelChange += new mxGraphModelChangeEventHandler(RefreshBuffer);
        }

        public mxGraph Graph
        {
            get { return graph; }
        }

        protected void PaintBuffer(object sender, PaintEventArgs e)
        {
            Graphics graphics = e.Graphics;
            graphics.DrawImageUnscaled(Buffer, AutoScrollPosition);
        }

        public Image Buffer
        {
            get {
                if (buffer == null)
                {
                    UpdateBuffer();
                }
                return buffer;
            }
        }

        protected void UpdateBuffer()
        {
            buffer = CreateBuffer();
            int width = buffer.Width;
            int height = buffer.Height;

            if (AutoScrollMinSize.Width != width ||
                AutoScrollMinSize.Height != height)
            {
                AutoScrollMinSize = new Size(width, height);
            }
        }

        protected Image CreateBuffer()
        {
            return mxCellRenderer.CreateImage(graph, null, 1, (Color?) BackColor, true, null);
        }

        protected void ClearBuffer()
        {
            buffer = null;
        }

        public void RefreshBuffer()
        {
            ClearBuffer();
            Refresh();
        }
    }

}
