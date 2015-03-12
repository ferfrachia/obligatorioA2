// $Id: Examples.cs,v 1.2 2010-01-19 16:20:32 gaudenz Exp $
// Copyright (c) 2007-2008, Gaudenz Alder
using System;
using System.Windows.Forms;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Xml;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using com.mxgraph;

namespace examples
{
    public class GraphExamples
    {

        static void Main(string[] args)
        {
            example1();
            example2();
            example3();
            example4();
        }

        static void example1()
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

            // Example to save the graph in multiple images
            //Image img = mxCellRenderer.CreateImage(graph, null, 1, Color.White, true, new mxRectangle(0, 0, 150, 200));
            //img.Save("example1.png", ImageFormat.Png);

            //Image img2 = mxCellRenderer.CreateImage(graph, null, 1, (Color?)BackColor, true, new mxRectangle(150, 0, 150, 200));
            //img2.Save("example2.png", ImageFormat.Png);
        }

        static void example2()
        {
            //XmlTextReader xmlReader = new XmlTextReader(new StringReader(mxUtils.ReadFile("../../../php/examples/diagrams/graphview.xml")));
            //mxGraphViewImageReader viewReader = new mxGraphViewImageReader(
            //    xmlReader, Color.White, 4, true, false);
            //Image image = mxGraphViewImageReader.Convert(viewReader);
            //image.Save("C:/example1.png", System.Drawing.Imaging.ImageFormat.Png);
        }

        static void example3()
        {
            GraphForm form = new GraphForm();
            Application.Run(form);
        }

        static void example4()
        {
            LayoutForm form = new LayoutForm();
            Application.Run(form);
        }

    }

}
