package com.mxgraph.test;

import java.io.File;
import java.io.IOException;

import junit.framework.TestCase;
import junit.framework.TestSuite;
import junit.textui.TestRunner;

import org.w3c.dom.Document;
import org.w3c.dom.Node;

import com.mxgraph.io.mxCodec;
import com.mxgraph.io.mxVdxCodec;
import com.mxgraph.util.mxUtils;
import com.mxgraph.view.mxGraph;

public class mxVdxTest extends TestCase
{

	public final String PATH_VDX = "vdx/";

	public final String PATH_MXE = "mxe/";

	public mxVdxTest(String name)
	{
		super(name);
	}

	public void testVisio() throws IOException
	{
		int total = 0;
		int count = 0;
		File directory = new File(PATH_VDX);
		String[] files = directory.list();

		for (int i = 0; i < files.length; i++)
		{
			try
			{
				if (files[i].endsWith(".vdx"))
				{
					mxGraph graph = new mxGraph();
					String visioVdx = mxUtils.readFile(PATH_VDX + files[i]);
					Document doc = mxUtils.parseXml(visioVdx);
					mxVdxCodec.decode(doc, graph);

					mxCodec codec = new mxCodec();
					Node node = codec.encode(graph.getModel());
					String jgraphXml = mxUtils.getXml(node);

					mxUtils.writeFile(jgraphXml, PATH_MXE
							+ files[i].substring(0, files[i].length() - 4)
							+ ".mxe");
				}
			}
			catch (IOException e)
			{
				e.printStackTrace();
			}
		}

		directory = new File(PATH_VDX);
		files = directory.list();
		for (int i = 0; i < files.length; i++)
		{
			try
			{
				if (files[i].endsWith(".vdx"))
				{
					total++;
					mxGraph graph = new mxGraph();
					String visioVdx = mxUtils.readFile(PATH_VDX + files[i]);
					Document doc = mxUtils.parseXml(visioVdx);
					mxVdxCodec.decode(doc, graph);

					mxCodec codec = new mxCodec();
					Node node = codec.encode(graph.getModel());
					String jgraphXml = mxUtils.getXml(node);

					String jgraphMxe = mxUtils.readFile(PATH_MXE
							+ files[i].substring(0, files[i].length() - 4)
							+ ".mxe");
					if (jgraphMxe.substring(0, jgraphMxe.length() - 1).equals(
							jgraphXml))
					{
						count++;
					}
				}
			}
			catch (IOException e)
			{
				e.printStackTrace();
			}
		}

		System.out.println(count + " out of " + total + " imports passed");
	}

	public static void main(String[] args)
	{
		TestRunner.runAndWait(new TestSuite(mxVdxTest.class));
	}
}
